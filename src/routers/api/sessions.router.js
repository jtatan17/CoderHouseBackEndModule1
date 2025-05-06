import { Router } from "express";

const sessionsRouter = Router();

const setSession = (req, res, next) => {
  try {
    req.session.email = "igna@coder.com";
    req.session.role = "ADMIN";
    const message = "session guardada";
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

const readSession = (req, res, next) => {
  try {
    const data = req.session;
    const message = "session leida";
    res.status(200).json({ message, data });
  } catch (error) {
    next(error);
  }
};

const clearSession = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "session eliminada";
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

sessionsRouter.get("/set", setSession);
sessionsRouter.get("/read", readSession);
sessionsRouter.get("/clear", clearSession);

export default sessionsRouter;
