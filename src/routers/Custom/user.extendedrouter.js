import { Router } from "express";
import usersManager from "../../Data/mongo/users.mongo.js";
import Manager from "../../Data/mongo/manager.mongo.js";
import CustomRouter from "./custom.router.js";
import {
  validateUser,
  handleValidationErrors,
} from "../../middleware/validationHandler.mid.js";

import {
  createUser,
  createUserMock,
  readUsers,
  readOneUser,
  deleteUser,
  updateUser,
  findByName,
  routeParam,
  routeNotFound,
} from "../../controllers/users.controller.js";

import { login, register } from "../../controllers/auth.controller.js";

export default class UsersExtendRouter extends CustomRouter {
  init() {
    const userService = new Manager();
    this.get("/", ["PUBLIC"], (req, res) => {
      try {
        res.sendSuccess("Hola Coders!!");
      } catch (error) {
        res.sendError(error);
      }
    });
    this.get("/find", ["ADMIN"], findByName);

    this.get("/adminUser", ["ADMIN"], (req, res) => {
      res.sendSuccess(req.user);
    });

    this.post("/login", ["PUBLIC"], login);
    this.post("/register", ["PUBLIC"], register);
  }
}
