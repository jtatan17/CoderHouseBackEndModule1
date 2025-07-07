import { Router } from "express";
import { passportCall, authorization } from "../helpers/tokens.helper.js";
import {
  indexView,
  productView,
  cartView,
  profileView,
  registerView,
  logInView,
  cartSuccess,
  productRegistration,
  resetPassword,
  newPassword,
} from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/", indexView);

viewsRouter.get("/LogIn", logInView);

viewsRouter.get("/product/:_id", productView);

// viewsRouter.get("/cart/:pid", cartView);

viewsRouter.get("/cart", cartView);

viewsRouter.get("/register", registerView);

viewsRouter.get("/profile/:uid", productView);

viewsRouter.get("/checkout/success", cartSuccess);

viewsRouter.get(
  "/productManager",
  passportCall("jwt"),
  authorization("admin"),
  productRegistration
);

viewsRouter.get("/profile", passportCall("jwt"), profileView);

viewsRouter.get("/resetPassword", resetPassword);
viewsRouter.get("/newPassword/:token", newPassword);

export default viewsRouter;
