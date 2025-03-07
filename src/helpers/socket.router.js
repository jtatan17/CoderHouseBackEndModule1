import { socketServer } from "../../index.js";
import productsManager from "../Data/fs/products.fs.js";

async function socketHelper(socket) {
  console.log("Socket connected:", socket.id);

  // Emit initial products
  let products = await productsManager.readAll();
  products = products.reverse();
  socket.emit("products", products);

  // Handle new product creation
  socket.on("newProduct", async (data) => {
    await productsManager.create(data);
    let products = await productsManager.readAll();
    products = products.reverse();
    socketServer.emit("products", products);
  });

  //  Handle user login
  socket.on("userLoggedIn", (user) => {
    console.log("User logged in:", user); // Debugging log
    socketServer.emit("showUser", user); // Broadcast to all clients
  });
}

export default socketHelper;
