// import { body } from "express-validator";

// const socket = io();

// socket.on("products", (data) => {
//   const usersTemplate = data.map(
//     (each) =>
//       `<div class="card" style="width: 18rem;">
//     ${
//       each.photo
//         ? `<img
//         src="${each.photo}"
//         class="card-img-top"
//         alt="${each._id}"
//         style="height: 18rem; object-fit: cover"
//       />`
//         : `<img
//         src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png"
//         class="card-img-top"
//         alt="${each._id}"
//         style="height: 18rem; object-fit: cover"
//       />`
//     }
//       <div class="card-body">
//         <h5 class="card-title">${each.title}</h5>
//         <p class="card-text">USD: ${each.price}</p>
//         <p class="card-text">Stock: ${each.stock}</p>
//         <p class="card-text">Category: ${each.category}</p>
//         <a href="/product/${each._id}" class="btn btn-primary">Info</a>
//       </div>
//     </div>`
//   );
//   document.querySelector("#products").innerHTML = usersTemplate;
// });

document.querySelector("#register").addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const data = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      age: document.querySelector("#age").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      avatar: document.querySelector("#avatar").value,
    };

    if (
      !data.firstName ||
      !data.lastName ||
      !data.age ||
      !data.email ||
      !data.password
    ) {
      return alert("Please fill in all required fields");
    }

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const url = "/api/auth/register";
    let response = await fetch(url, opts);
    let result = await response.json();

    if (!response.ok) {
      // Handle 409 Conflict (user already exists)
      if (response.status === 409) {
        throw new Error("User already registered");
      }
      throw new Error(
        result.message || "Registration failed, please try again"
      );
    }

    console.log(response);
    alert("Registration succefull✅");
    location.replace("/login");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }

  // const product = {
  //   title,
  //   price,
  //   stock,
  //   category,
  //   photo,
  // };
  // socket.emit("newProduct", product);
  //
});
