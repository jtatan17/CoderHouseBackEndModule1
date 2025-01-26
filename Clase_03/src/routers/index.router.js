import { Router } from "express";
import apiRouter from "./api/index.api.js";

const router = Router();

router.use("/api", apiRouter);

router.get("/api/welcome", (req, res) => {
  const { name, age } = req.query;
  const message = `Hola ${name || "Coder"}, tu edad es ${age || 18} años`;
  return res.status(200).send(message);
});

//Router
const indexPoint = "/";
const indexCB = (req, res) => res.status(200).send("WELCOME TO MY COMMERCE");
router.get(indexPoint, indexCB);
const apiPoint = "/api";
const apiCB = (req, res) => res.status(200).send("WELCOME TO MY API");
router.get(apiPoint, apiCB);

export default router;
