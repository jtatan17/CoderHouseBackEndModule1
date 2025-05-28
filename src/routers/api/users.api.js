import { Router } from "express";

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

const usersRouter = Router();

usersRouter.post("/mock", createUserMock);
usersRouter.post("", validateUser, handleValidationErrors, createUser);
usersRouter.get("", readUsers);
usersRouter.get("/name/:word([A-Za-z]+)", findByName);
usersRouter.get("/:uid", readOneUser);
usersRouter.delete("/:uid", deleteUser);
usersRouter.put("/:uid", updateUser);
usersRouter.param("word", routeParam);
usersRouter.get("*", routeNotFound);

export default usersRouter;
