import Product from "../Data/mongo/models/products.model.js";
import productsManager from "../Data/mongo/products.mongo.js";

const indexView = async (req, res, next) => {
  try {
    const all = await productsManager.readAll();
    const plainProducts = all.map((p) => p.toObject());

    const data = {
      title: "Home",
      products: plainProducts,
    };

    return res.status(200).render("index", data);
  } catch (error) {
    next(error);
  }
};

const productView = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const one = await productsManager.readById(_id);
    const data = {
      title: "Product",
      product: one,
    };
    console.log(data);
    return res.status(200).render("product", data);
  } catch (error) {
    next(error);
  }
};

const cartView = (req, res, next) => {
  try {
    res.render("cart", { title: "Cart" });
  } catch (error) {
    next(error);
  }
};

const profileView = (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    const data = {
      title: "Profile",
      user: user,
    };
    return res.status(200).render("profile", data);
  } catch (error) {
    next(error);
  }
};

const registerView = (req, res, next) => {
  try {
    const data = {
      title: "Real Register",
    };
    return res.status(200).render("userRegister", data);
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).render("error");
  }
};

const logInView = (req, res, next) => {
  try {
    const data = {
      title: "Log In",
    };
    return res.status(200).render("userLogIn", data);
  } catch (error) {
    next(error);
  }
};

const cartSuccess = (req, res, next) => {
  try {
    const data = {
      title: "Cart Checkout",
    };
    return res.status(200).render("checkout", data);
  } catch (error) {
    next(error);
  }
};

const productRegistration = (req, res, next) => {
  try {
    const data = {
      title: "Product Registration",
    };

    return res.status(200).render("productRegister", data);
  } catch (error) {
    next(error);
  }
};

const resetPassword = (req, res, next) => {
  try {
    const data = {
      title: "Reset Password",
    };

    return res.status(200).render("resetPassword", data);
  } catch (error) {
    next(error);
  }
};

const newPassword = (req, res, next) => {
  try {
    const data = {
      title: "Create new password",
    };
    return res.status(200).render("newPassword", data);
  } catch (error) {
    next(error);
  }
};

export {
  indexView,
  productView,
  cartView,
  profileView,
  registerView,
  logInView,
  cartSuccess,
  productRegistration,
  resetPassword,
  newPassword,
};
