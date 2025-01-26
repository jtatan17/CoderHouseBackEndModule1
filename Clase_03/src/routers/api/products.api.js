import { Router } from "express";
import {
  readOneProduct,
  readProducts,
  createProduct,
  createProductMock,
  updateProduct,
  deleteProduct,
} from "../../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/:pid", readOneProduct);

productsRouter.get("", readProducts);

productsRouter.post("", createProduct);

productsRouter.post("/mock", createProductMock);

productsRouter.put("/:pid", updateProduct);

productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
