import { Router } from "express";
import usersManager from "../../Data/mongo/users.mongo.js";

const authRouter = Router();

const register = async (req, res, next) => {
  try {
    const data = req.body;

    const existingUser = await usersManager.readBy({ email: data.email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409; // 409 Conflict is appropriate for duplicate resource
      throw error;
    }

    const response = await usersManager.create(data);
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const response = await usersManager.readBy({ email });

    if (response.passoword !== password) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    req.session.user_id = response._id;
    req.session.email = email;
    req.session.role = response.role;
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};

const online = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.status(200).json({
        online: true,
        method: req.method,
        url: req.url,
      });
    } else {
      res.status(401).json({
        online: false,
        method: req.method,
        url: req.url,
      });
    }
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/online", online);

export default authRouter;
