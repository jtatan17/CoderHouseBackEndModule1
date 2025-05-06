const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    data = response.json();
    console.log(data);
    const selector = document.querySelector("opts");
    if (response.online) {
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/profile/${user_id}">Profile</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/cart/${user_id}">Cart</a>
        <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
    `;
    } else {
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
    `;
    }
  } catch (error) {}
};

isOnline();
