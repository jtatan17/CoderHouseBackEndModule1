(function () {
  "use strict";

  let addItemCallCount = 0;
  let globalAddLock = false; // ✅ Moved here!

  const Cart = {
    init: function () {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.updateBadge();
    },

    addItem: async function (productId) {
      try {
        console.log("🛒 addItem called", ++addItemCallCount);
        const response = await fetch(`/api/carts/validate/${productId}`);
        if (!response.ok) throw new Error("Product not found");

        const { data: product } = await response.json();

        let cart = [...this.getCart()];
        const existingItem = cart.find((item) => item._id === product._id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            stock: product.stock,
            quantity: 1,
            addedAt: new Date().toISOString(),
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        this.updateBadge();
        this.showFeedback(true);
      } catch (err) {
        console.error("Cart error:", err);
        this.showFeedback(false);
      }
    },

    getCart: function () {
      return JSON.parse(localStorage.getItem("cart")) || [];
    },

    updateBadge: function () {
      const count = this.getCart().reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      document.querySelectorAll(".cart-badge").forEach((badge) => {
        badge.textContent = count;
      });
    },

    showFeedback: function (success = true) {
      const toastEl = document.getElementById(
        success ? "addedToCartToast" : "errorToast"
      );
      if (toastEl && bootstrap) {
        new bootstrap.Toast(toastEl).show();
      }
    },
  };

  const pendingAdds = new Set();

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    e.preventDefault();
    const productId = btn.dataset.productId;

    if (!productId || pendingAdds.has(productId) || globalAddLock) return;

    globalAddLock = true;
    pendingAdds.add(productId);
    btn.disabled = true;

    try {
      await Cart.addItem(productId);
    } finally {
      pendingAdds.delete(productId);
      btn.disabled = false;
      setTimeout(() => (globalAddLock = false), 300);
    }
  });

  document.addEventListener("DOMContentLoaded", () => Cart.init());
})();
