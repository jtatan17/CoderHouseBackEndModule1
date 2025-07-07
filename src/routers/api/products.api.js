import { Router } from "express";
import {
  readOneProduct,
  readProducts,
  createProduct,
  createProductMock,
  updateProduct,
  deleteProduct,
  paginate,
  updateOneProduct,
  deleteOneProduct,
} from "../../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/pages", paginate);

productsRouter.post("/findProduct", readOneProduct);

productsRouter.get("", readProducts);

productsRouter.post("/createProduct", createProduct);

productsRouter.post("/mock", createProductMock);

productsRouter.put("/updateProduct", updateOneProduct);

productsRouter.put("/:pid", updateProduct);

productsRouter.delete("/deleteProduct", deleteOneProduct);
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
