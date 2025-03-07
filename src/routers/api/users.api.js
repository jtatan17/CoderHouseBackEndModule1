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
} from "../../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.post("/mock", createUserMock);
usersRouter.post("", validateUser, handleValidationErrors, createUser);
usersRouter.get("", readUsers);
usersRouter.get("/:uid", readOneUser);
usersRouter.delete("/:uid", deleteUser);
usersRouter.put("/:uid", updateUser);

export default usersRouter;
