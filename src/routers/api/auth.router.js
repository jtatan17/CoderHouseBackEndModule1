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
  currentUser,
} from "../../controllers/auth.controller.js";
import { passportJWT } from "../../middleware/passport.mid.js";

const authRouter = Router();

authRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/auth/fail-register",
  }),
  register
);
authRouter.post("/login", login);
authRouter.get("/online", online);
authRouter.get("/logout", logout);
authRouter.get("/fail-register", failRegister);
authRouter.get("/fail-login", failLogin);
authRouter.get("/current", passportJWT, currentUser);

export default authRouter;
