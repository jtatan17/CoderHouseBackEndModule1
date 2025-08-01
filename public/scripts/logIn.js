// const socket = io();

// document.querySelector("#LogIn").addEventListener("click", async () => {
//   const userEmail = document.querySelector("#UserEmail").value;
//   const userPassword = document.querySelector("#Password").value;

//   const response = await fetch("/api/userlogin", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email: userEmail, password: userPassword }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const data = await response.json();
//   console.log(data);

//   document.querySelector("#UserEmail").value = "";
//   document.querySelector("#Password").value = "";

//   if (data.message === "Login successful") {
//     socket.emit("userLoggedIn", data.response);
//     console.log(data.response);
//   } else {
//     alert("Invalid credentials");
//   }
// });

// socket.on("showUser", (user) => {
//   console.log("Received user data:", user);
//   document.getElementById("userInfo").innerHTML = `
//   <div class="card" style="width: 18rem;">
//   <img
//     src="${
//       user.avatar
//         ? user.avatar
//         : "https://cdn-icons-png.flaticon.com/512/9402/9402212.png"
//     }"
//     class="card-img-top img-fluid"
//     alt="${user._id}"
//     style="height: 200px; object-fit: contain;"
//   />
//   <div class="card-body text-center">
//     <h5 class="card-title">Congrats 😁🎉 you logged in using: ${user.email}</h5>
//     <p class="card-text">Your role is: ${user.role}</p>
//   </div>
// </div>`;
// });

document.querySelector("#LogIn").addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#UserEmail").value,
      password: document.querySelector("#Password").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const url = "/api/auth/login";
    let response = await fetch(url, opts);
    const result = await response.json();
    console.log(result);

    if (response.status >= 200 && response.status < 300) {
      alert("Login successful");
      location.replace("/Profile");
    } else {
      alert(result.message || "Login failed"); // ✅ Show meaningful error
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login, please try again.");
  }
});
