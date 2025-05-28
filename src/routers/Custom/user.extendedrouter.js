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

export default class UsersExtendRouter extends CustomROuter {
  init() {
    const userService = new Manager();
    this.get("/", ["PUBLIC"], (req, res) => {
      res.sendSuccess("Hola Coders!!");
    });
    this.get("/", ["ADMIN"], findByName);
  }
}
