document.querySelector("#LogOut").addEventListener("click", async () => {
  try {
    const opts = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const url = "/api/auth/logout";
    let response = await fetch(url, opts);
    const result = await response.json();
    console.log(result);
    alert("Log out successful");
    location.replace("/");
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
});
