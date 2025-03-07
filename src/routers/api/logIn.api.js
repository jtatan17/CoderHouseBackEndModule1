import { Router } from "express";

import loginUser from "../../controllers/userLogIn.controller.js";

const logInRouter = Router();

logInRouter.post("/", loginUser);

export default logInRouter;
