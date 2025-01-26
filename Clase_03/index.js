import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middleware/pathHandler.mid.js";
import errorHandler from "./src/middleware/errorHandler.mid.js";

// Server Settings
const server = express();
const port = 8080;
const ready = () => console.log("server is ready on port " + port);
server.listen(port, ready);

//Funcionalidadaes Servidor
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Router
server.use("/", router);
server.use(pathHandler);
server.use(errorHandler);
