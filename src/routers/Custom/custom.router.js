import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../helpers/tokens.helper";
import { param } from "express-validator";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}

  get(path, policies, ...callbacks) {
    console.log("Entrando con GET con Custom Router con PATH:" + path);
    console.log(policies);

    this.router.get(path, this.handlePolicies(policies)),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks);
  }

  handlePolicies = (policies) => (req, res, next) => {
    console.log("Politicas a evaluar");
    console.log(policies);

    if (policies[0] === "PUBLIC") return next();

    const authHeader = req.headers.authorization;
    console.log("Token present in header auth");
    console.log(authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .send({ error: "User not authenticated or missing token" });
    }
    const token = authHeader.split("")[1];
    jwt.verify(token, PRIVATE_KEY, (error, credenciales) => {
      if (error) return res.status(403).send("Toekn invalid, unauthorized");

      const user = credenciales.user;
      if (!policies.includes(user.role.toUpperCase()))
        return res
          .status(403)
          .send({ error: "El usuario no tiene privilegios, revisar roles" });
      req.user = user;
      console.log(req.user);
      next();
    });
  };

  generateCustomResponses = (req, res, next) => {
    res.sendSucces = (payload) =>
      res.status(200).send({ status: "Success", payload });
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.error(error);
        params[1].status(500).send(error);
      }
    });
  }
}
