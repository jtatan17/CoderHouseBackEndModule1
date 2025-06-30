// cartOperations.js

async function getUserId() {
  try {
    const res = await fetch("/api/auth/current", {
      method: "GET",
      credentials: "include", // ⬅️ Very important to send cookies
    });

    if (!res.ok) throw new Error("Not logged in");

    const data = await res.json();
    return data.user?.user_id || null;
  } catch (err) {
    console.warn("Unable to fetch user ID:", err);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-content");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="alert alert-info">
        Your cart is empty. <a href="/products">Browse products</a> to get started!
      </div>
    `;
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const cartItemsHTML = cart
    .map(
      (item) => `
    <div class="card mb-3 cart-item" data-id="${item._id}">
      <div class="row g-0">
        <div class="col-md-3">
          <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}" />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">$${item.price} each</p>
            <div class="input-group quantity-selector" style="max-width: 150px;">
              <button class="btn btn-outline-secondary minus-btn">-</button>
              <input type="text" class="form-control text-center quantity" value="${item.quantity}" readonly />
              <button class="btn btn-outline-secondary plus-btn">+</button>
            </div>
          </div>
        </div>
        <div class="col-md-2 d-flex align-items-center justify-content-end">
          <button class="btn btn-danger remove-btn" data-id="${item._id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  cartContainer.innerHTML = `
    <div class="row">
      <div class="col-lg-8">${cartItemsHTML}</div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Order Summary</h5>
            <hr />
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
            <button id="checkout-btn" class="btn btn-primary w-100 mt-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Quantity adjustment
  function updateCartItem(id, updateFn) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((i) => i._id === id);
    if (item) {
      updateFn(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  }

  cartContainer.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.closest(".cart-item").dataset.id;
      updateCartItem(id, (item) => (item.quantity += 1));
    });
  });

  cartContainer.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.closest(".cart-item").dataset.id;
      updateCartItem(id, (item) => {
        if (item.quantity > 1) item.quantity -= 1;
      });
    });
  });

  cartContainer.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const updatedCart = JSON.parse(localStorage.getItem("cart")).filter(
        (i) => i._id !== id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      location.reload();
    });
  });

  // ✅ SINGLE Checkout Handler
  document
    .getElementById("checkout-btn")
    .addEventListener("click", async () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // 1. Validate stock for all items
        const stockValidations = await Promise.all(
          cart.map((item) =>
            fetch(`/api/carts/validate/${item._id}`)
              .then((res) => {
                if (!res.ok)
                  throw new Error(`Validation failed for ${item._id}`);
                return res.json();
              })
              .then((data) => ({ item, data }))
          )
        );

        // 2. Check for out-of-stock items
        const outOfStockItems = stockValidations.filter(
          ({ data, item }) => !data.success || item.quantity > data.data.stock
        );

        if (outOfStockItems.length > 0) {
          const errorMessage = [
            "Some items are not available in the requested quantities:",
            ...outOfStockItems.map(
              ({ item, data }) =>
                `- ${item.title}: Available ${data.data.stock}, Requested ${item.quantity}`
            ),
            "\nPlease adjust your quantities before checkout.",
          ].join("\n");

          alert(errorMessage);
          return;
        }

        // 3. Get user ID
        const userId = await getUserId();
        if (!userId) {
          alert("Please login to complete your purchase");
          window.location.href = "/login";
          return;
        }

        // 4. Process checkout
        const response = await fetch("/api/carts/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            cart: cart.map((item) => ({
              product_id: item._id,
              quantity: item.quantity,
            })),
            total: cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          localStorage.removeItem("cart");
          window.location.href = "/checkout/success";
        } else {
          throw new Error(result.message || "Checkout failed");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        alert(`Checkout failed: ${error.message}`);
      }
    });
});
