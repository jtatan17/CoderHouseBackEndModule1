import { Router } from "express";
import { passportCall, authorization } from "../helpers/tokens.helper.js";
import {
  indexView,
  productView,
  cartView,
  profileView,
  registerView,
  logInView,
} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/", indexView);

viewsRouter.get("/LogIn", logInView);

viewsRouter.get("/product/:pid", productView);

viewsRouter.get("/cart/:pid", cartView);

viewsRouter.get("/register", registerView);

viewsRouter.get("/profile/:uid", productView);

viewsRouter.get(
  "/profile",
  passportCall("jwt"),
  authorization("user"),
  profileView
);

export default viewsRouter;
