const socket = io();

socket.on("products", (data) => {
  const usersTemplate = data.map(
    (each) =>
      `<div class="card" style="width: 18rem;">
    ${
      each.photo
        ? `<img
        src="${each.photo}"
        class="card-img-top"
        alt="${each._id}"
        style="height: 18rem; object-fit: cover"
      />`
        : `<img
        src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png"
        class="card-img-top"
        alt="${each._id}"
        style="height: 18rem; object-fit: cover"
      />`
    }
      <div class="card-body">
        <h5 class="card-title">${each.title}</h5>
        <p class="card-text">USD: ${each.price}</p>
        <p class="card-text">Stock: ${each.stock}</p>
        <p class="card-text">Category: ${each.category}</p>
        <a href="/product/{{this._id}}" class="btn btn-primary">Info</a>
      </div>
    </div>`
  );
  document.querySelector("#products").innerHTML = usersTemplate;
});

document.querySelector("#register").addEventListener("click", async () => {
  const title = document.querySelector("#ProductTitle").value;
  const price = document.querySelector("#Price").value;
  const stock = document.querySelector("#Stock").value;
  const category = document.querySelector("#Category").value;
  const photo = document.querySelector("#avatar").value;
  const product = {
    title,
    price,
    stock,
    category,
    photo,
  };
  socket.emit("newProduct", product);
  document.querySelector("#ProductTitle").value = "";
  document.querySelector("#Price").value = "";
  document.querySelector("#Stock").value = "";
  document.querySelector("#Category").value = "";
  document.querySelector("#avatar").value = "";
});
