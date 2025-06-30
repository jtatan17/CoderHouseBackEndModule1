document
  .querySelector("#registerAProduct")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: document.querySelector("#productName").value,
        stock: document.querySelector("#stock").value,
        price: document.querySelector("#price").value,
        image: document.querySelector("#image").value,
        category: document.querySelector("#category").value,
      };

      if (
        !data.title ||
        !data.stock ||
        !data.price ||
        !data.image ||
        !data.category
      ) {
        return alert("Please fill in all required fields");
      }

      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      const url = "/api/products/createProduct";
      let response = await fetch(url, opts);
      let result = await response.json();

      if (!response.ok) {
        // Handle 409 Conflict (user already exists)
        if (response.status === 409) {
          throw new Error("Product already registered");
        }
        throw new Error(result.message || "Registration failed");
      }

      console.log(response);

      alert("Product has been registered succesfully");
      location.replace("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    }
  });
