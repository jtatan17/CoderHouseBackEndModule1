import { socketServer } from "../../index.js";
import productsManager from "../Data/fs/products.fs.js";

async function socketHelper(socket) {
  console.log(socket.id);
  let products = await productsManager.readAll();
  products = products.reverse();
  socket.emit("products", products);
  socket.on("newProduct", async (data) => {
    await productsManager.create(data);
    let products = await productsManager.readAll();
    products = products.reverse();
    socketServer.emit("products", products);
  });
}

export default socketHelper;
