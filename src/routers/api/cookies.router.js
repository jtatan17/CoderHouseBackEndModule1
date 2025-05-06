import { Router } from "express";

const cookieRouter = Router();

const setCookie = (req, res, next) => {
  try {
    const maxAge = 1000 * 60 * 60 * 24 * 7;
    const message = "Cookie seteada";
    res
      .status(200)
      .cookie("modo", "oscuro", { maxAge })
      .cookie("user_id", "1234", { maxAge, signed: true })
      .json({ message });
  } catch (error) {
    next(error);
  }
};

const readCookie = (req, res, next) => {
  try {
    const cookie = req.cookies.modo;
    const signedCookie = req.signedCookies.user_id;
    const message = "Cookie leida";
    res.status(200).json({ cookie, signedCookie });
  } catch (error) {
    next(error);
  }
};

const clearCookie = (req, res, next) => {
  try {
    const message = "Cookies eliminada";
    res
      .status(200)
      .clearCookie("modo")
      .clearCookie("user_id")
      .json({ message });
  } catch (error) {
    next(error);
  }
};

cookieRouter.get("/", setCookie);
cookieRouter.get("/read", readCookie);

cookieRouter.get("/clear", clearCookie);

export default cookieRouter;
