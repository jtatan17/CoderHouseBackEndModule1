function toggleForm(action) {
  const forms = document.querySelectorAll(".admin-form");
  forms.forEach((form) => form.classList.add("d-none"));

  const activeForm = document.getElementById(`form-${action}`);
  if (activeForm) activeForm.classList.remove("d-none");
}

/* ----------------------------- ADD PRODUCT ----------------------------- */
document
  .getElementById("addProductForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById("addTitle").value,
      stock: document.getElementById("addStock").value,
      price: document.getElementById("addPrice").value,
      image: document.getElementById("addImage").value,
      category: document.getElementById("addCategory").value,
    };

    if (Object.values(data).some((val) => !val)) {
      return alert("Please fill in all fields");
    }

    console.log("Add product payload:", data);

    try {
      const response = await fetch("/api/products/createProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to add product");
      alert("✅ Product added successfully!");
    } catch (error) {
      console.error("Add error:", error);
      alert("❌ " + error.message);
    }

    // TODO: send fetch POST to /api/products/createProduct
  });

/* ----------------------------- FIND PRODUCT ----------------------------- */
document
  .getElementById("findProductForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("findInput").value.trim();

    if (!query) return alert("Please enter a product name");

    console.log("Find product query:", query);

    try {
      const response = await fetch("/api/products/findProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Product not found");

      document.getElementById("findResult").textContent = JSON.stringify(
        result.response,
        null,
        2
      );
    } catch (error) {
      console.error("Find error:", error);
      alert("❌ " + error.message);
    }
  });

/* ----------------------------- UPDATE PRODUCT ----------------------------- */
document
  .getElementById("updateProductForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentTitle = document.getElementById("updateTitle").value.trim();
    if (!currentTitle) return alert("Please enter the current product title");

    const updateData = {
      ...(document.getElementById("newTitle").value && {
        title: document.getElementById("newTitle").value,
      }),
      ...(document.getElementById("newStock").value && {
        stock: document.getElementById("newStock").value,
      }),
      ...(document.getElementById("newPrice").value && {
        price: document.getElementById("newPrice").value,
      }),
      ...(document.getElementById("newImage").value && {
        image: document.getElementById("newImage").value,
      }),
      ...(document.getElementById("newCategory").value && {
        category: document.getElementById("newCategory").value,
      }),
    };

    if (Object.keys(updateData).length === 0) {
      return alert("Please enter at least one field to update");
    }

    console.log("Update filter (currentTitle):", currentTitle);
    console.log("Update data:", updateData);

    try {
      const response = await fetch("/api/products/updateProduct", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentTitle, ...updateData }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Product not updated");

      alert("✅ Product updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ " + error.message);
    }
  });

/* ----------------------------- DELETE PRODUCT ----------------------------- */
document
  .getElementById("deleteProductForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("deleteTitle").value.trim();

    if (!title) return alert("Please enter a product title to delete");

    console.log("Delete product title:", title);

    try {
      const response = await fetch("/api/products/deleteProduct", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: { title } }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Product not updated");
      document.getElementById("deleteTitle").value = "";
      alert("✅ Product deleted successfully");
    } catch (error) {
      console.log("Delete error", error);
      alert("❌ " + error.message);
    }
  });
