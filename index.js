import "dotenv/config.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import connectMongo from "./src/helpers/mongo.helper.js";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import socketHelper from "./src/helpers/socket.router.js";

//Express Server Settings
const server = express();
const port = process.env.SERVER_PORT;
const ready = async () => {
  console.log("server is ready on port " + port);
  await connectMongo(process.env.MONGO_URL);
};
const httpServer = createServer(server);
httpServer.listen(port, ready);

//Scoket server settings
const socketServer = new SocketServer(httpServer);
socketServer.on("connection", socketHelper);
export { socketServer };

//Template Engine
server.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/src/views/layout", // Explicitly set layouts directory
  })
);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Funcionalidadaes Servidor
server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Router
server.use("/", router);
server.use(pathHandler);
server.use(errorHandler);
