import { Router } from "express";
import {
  addProductToCart,
  readProductsByUser,
  updateQuantity,
  removeProductFromCart,
  validateProduct,
  getSessionCart,
  syncSessionCart,
  validateCart,
  processCheckout,
} from "../../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/validate", validateCart);
cartsRouter.post("/checkout", processCheckout);

cartsRouter.get("/validate/:pid", validateProduct);
cartsRouter.post("/session", syncSessionCart);

cartsRouter.post("/", addProductToCart);
cartsRouter.get("/users/:user_id", readProductsByUser);
cartsRouter.put("/:cart_id", updateQuantity);
cartsRouter.delete("/:cart_id", removeProductFromCart);

cartsRouter.get("/session", getSessionCart);

export default cartsRouter;
