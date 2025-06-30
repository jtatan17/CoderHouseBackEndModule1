import usersManager from "../Data/mongo/users.mongo.js";
import { isValidPassword } from "../helpers/bcrypt.helper.js";
import authRepository from "../repositories/auth.repository.js";

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
    const user = await authRepository.findUserByEmail(email);
    console.log("Logeando un usuario");
    console.log(req.body);
    if (!user || !authRepository.validatePassword(user, password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const tokenPayload = {
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };

    const token = authRepository.generateToken(tokenPayload);
    console.log(token);
    res.cookie("jwtCookieToken", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      user: tokenPayload,
      method: req.method,
      url: req.url,
      message: "Login successful",
      status: "success",
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwtCookieToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ error: "Logout failed" });
        }
        return res.json({ message: "Logged out" });
      });
    } else {
      res.json({ message: "Logged out" });
    }
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

const currentUser = (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  res.json({
    success: true,
    user: req.user, // contains user_id, email, name, role
  });
};

export {
  register,
  login,
  logout,
  online,
  failRegister,
  failLogin,
  currentUser,
};
