import "dotenv/config.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import MongoSingleton from "./src/helpers/mongo.helper.js";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";
import socketHelper from "./src/helpers/socket.router.js";
import session from "express-session";

//Express Server Settings
const server = express();
const port = process.env.SERVER_PORT;
const ready = async () => {
  console.log("server is ready on port " + port);
  // await MongoSingleton.getInstance(process.env.MONGO_URL);
};
const httpServer = createServer(server);
httpServer.listen(port, ready);

//Socket server settings
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

// const fileStore = FileStore(session);
server.use(
  session({
    // store: new fileStore({ path: "./src/sessions", ttl: 20, retries: 3 }),
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 60 * 50,
    }),
    secret: process.env.SESSION_KEY || "fallback-secret",
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 7 * 24 * 60 * 60 * 100 },
  })
);

initializePassport();
server.use(passport.initialize());
server.use(passport.session());

server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser(process.env.COOKIE_KEY));

//Router
server.use("/", router);
server.use(pathHandler);
server.use(errorHandler);

//qtxx xjty wnwu irpl
