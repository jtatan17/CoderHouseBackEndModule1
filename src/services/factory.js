import MongoSingleton from "../helpers/mongo.helper.js";

let userService;

const persistence = process.env.PERSISTENCE;

switch (persistence) {
  case "mongo":
    console.log("Using MongoDB for persistence");
    await MongoSingleton.getInstance(process.env.MONGO_URL); // Connect to MongoDB
    const { default: usersManagerMongo } = await import(
      "../Data/mongo/users.mongo.js"
    );
    userService = usersManagerMongo;
    break;

  case "file":
    console.log("Using FileSystem for persistence");
    const { default: usersManagerFS } = await import("../Data/fs/users.fl.js");
    userService = usersManagerFS;
    break;

  default:
    throw new Error("Persistence type not recognized");
}

export { userService };
