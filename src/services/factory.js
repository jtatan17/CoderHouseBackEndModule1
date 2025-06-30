import MongoSingleton from "../helpers/mongo.helper.js";

let userService;
let productService;

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
    productService = productsManagerMongo;
    userService = usersManagerMongo;
    break;

  case "file":
    console.log("Using FileSystem for persistence");
    const { default: usersManagerFS } = await import("../Data/fs/users.fl.js");
    const { default: productsManagerFS } = await import(
      "../Data/fs/products.fl.js"
    );

    userService = usersManagerFS;
    productService = productsManagerFS;
    break;

  default:
    throw new Error("Persistence type not recognized");
}

export { userService, productService };
