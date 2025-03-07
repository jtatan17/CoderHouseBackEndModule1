const socket = io();

// socket.on("user", (data) => {
//   const userTemplate = data.map(
//     (each) =>
//       `<div class="card" style="width: 18rem;">
//       ${
//         each.photo
//           ? `<img
//           src="${each.photo}"
//           class="card-img-top"
//           alt="${each._id}"
//           style="height: 18rem; object-fit: cover"
//         />`
//           : `<img
//           src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png"
//           class="card-img-top"
//           alt="${each._id}"
//           style="height: 18rem; object-fit: cover"
//         />`
//       }
//         <div class="card-body">
//           <h5 class="card-title">${each.title}</h5>
//           <p class="card-text">USD: ${each.price}</p>
//           <p class="card-text">Stock: ${each.stock}</p>
//           <p class="card-text">Category: ${each.category}</p>
//           <a href="/product/${each._id}" class="btn btn-primary">Info</a>
//         </div>
//       </div>`
//   );
//   document.querySelector("#user").innerHTML = userTemplate;
// });

document.querySelector("#LogIn").addEventListener("click", async () => {
  const userEmail = document.querySelector("#UserEmail").value;
  const userPassword = document.querySelector("#Password").value;

  const response = await fetch("/api/userlogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  document.querySelector("#UserEmail").value = "";
  document.querySelector("#Password").value = "";

  if (data.message === "Login successful") {
    socket.emit("userLoggedIn", data.response);
    console.log(data.response);
  } else {
    alert("Invalid credentials");
  }
});

socket.on("showUser", (user) => {
  console.log("Received user data:", user);
  document.getElementById("userInfo").innerHTML = `
  <div class="card" style="width: 18rem;">
  <img
    src="${
      user.avatar
        ? user.avatar
        : "https://cdn-icons-png.flaticon.com/512/9402/9402212.png"
    }"
    class="card-img-top img-fluid"
    alt="${user._id}"
    style="height: 200px; object-fit: contain;"
  />
  <div class="card-body text-center">
    <h5 class="card-title">Congrats 😁🎉 you logged in using: ${user.email}</h5>
    <p class="card-text">Your role is: ${user.role}</p>
  </div>
</div>`;
  // socket.emit("newProduct", product);
});
