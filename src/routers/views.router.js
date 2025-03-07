import { Router } from "express";
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

export default viewsRouter;
