import { Router } from "express";
import {
  addProductToCart,
  readProductsByUser,
  updateQuantity,
  removeProductFromCart,
} from "../../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", addProductToCart);
cartsRouter.get("/users/:user_id", readProductsByUser);
cartsRouter.put("/:cart_id", updateQuantity);
cartsRouter.delete("/:cart_id", removeProductFromCart);

export default cartsRouter;
