import { Router } from "express";
import { createHash, isValidPassword } from "../../helpers/bcrypt.helper.js";
import passport from "passport";

import {
  register,
  login,
  online,
  logout,
  failRegister,
  failLogin,
} from "../../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/fail-register",
  }),
  register
);
authRouter.post("/login", login);
authRouter.get("/online", online);
authRouter.get("/logout", logout);
authRouter.get("/fail-register", failRegister);
authRouter.get("/fail-login", failLogin);

export default authRouter;
