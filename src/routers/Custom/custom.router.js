import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../helpers/tokens.helper.js";
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

    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    console.log("Entrando con GET con Custom Router con PATH:" + path);
    console.log(policies);

    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    console.log("Entrando con GET con Custom Router con PATH:" + path);
    console.log(policies);

    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    console.log("Entrando con GET con Custom Router con PATH:" + path);
    console.log(policies);
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
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
    const token = authHeader.split(" ")[1];
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
    res.sendSuccess = (payload) =>
      res.status(200).json({
        status: "Success",
        payload,
      });
    res.sendServerError = (error) =>
      res.status(500).json({ status: "Error", error });
    res.sendError = (error) => res.status(400).json({ status: "Error", error });
    next();
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
