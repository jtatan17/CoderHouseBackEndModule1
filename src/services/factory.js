import MongoSingleton from "../helpers/mongo.helper.js";

let userService;
let productService;
let cartService;

const persistence = process.env.PERSISTENCE;

switch (persistence) {
  case "mongo":
    console.log("Using MongoDB for persistence");
    await MongoSingleton.getInstance(process.env.MONGO_URL); // Connect to MongoDB
    const { default: usersManagerMongo } = await import(
      "../Data/mongo/users.mongo.js"
    );
    const { default: productsManagerMongo } = await import(
      "../Data/mongo/products.mongo.js"
    );
    const { default: cartsManagerMongo } = await import(
      "../Data/mongo/carts.mongo.js"
    );

    productService = productsManagerMongo;
    userService = usersManagerMongo;
    cartService = cartsManagerMongo;
    break;

  case "file":
    console.log("Using FileSystem for persistence");
    const { default: usersManagerFS } = await import("../Data/fs/users.fl.js");
    const { default: productsManagerFS } = await import(
      "../Data/fs/products.fs.js"
    );
    const { default: cartsManagerFS } = await import("../Data/fs/cart.fl.js");

    userService = new usersManagerFS();
    productService = new productsManagerFS();
    cartService = new cartsManagerFS();
    break;

  default:
    throw new Error("Persistence type not recognized");
}

export { userService, productService, cartService };
