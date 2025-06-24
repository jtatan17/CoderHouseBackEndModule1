import usersManager from "../Data/mongo/users.mongo.js";
import { createHash, isValidPassword } from "../helpers/bcrypt.helper.js";
import passport from "passport";
import { generateToken } from "../helpers/tokens.helper.js";

const register = async (req, res, next) => {
  res.status(201).json({
    response: req.user,
    method: req.method,
    url: req.url,
    message: "Registration Succesfull",
  });
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersManager.readBy({ email });
    console.log("Logeando un usuario");
    console.log(req.body);
    if (!user || !isValidPassword(user, password)) {
      return done(null, false, { message: "Invalid credentials" });
    }
    const tokenUser = {
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };
    const access_token = generateToken(tokenUser);
    console.log(access_token);
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 6000,
      httpOnly: true,
    });

    res.status(201).json({
      user: tokenUser,
      method: req.method,
      url: req.url,
      message: "Login successful",
      status: "success",
      payload: access_token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      res.clearCookie("connect.sid", { path: "/" });
      res.json({ message: "Logged out" });
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

const failRegister = async (req, res, next) => {
  res.status(401).send({ error: "Fail register proccess" });
};
const failLogin = async (req, res, next) => {
  res.status(401).send({
    error: "Login failed",
    message: req.session.messages?.pop(),
  });
};

export { register, login, logout, online, failRegister, failLogin };
