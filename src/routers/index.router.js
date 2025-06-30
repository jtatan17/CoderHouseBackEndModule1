import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views.router.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/api", apiRouter);

router.get("/checkout/success", (req, res) => {
  res.render("checkout/success");
});

export default router;
