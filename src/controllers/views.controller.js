import productsManager from "../Data/fs/products.fs.js";

const indexView = async (req, res, next) => {
  try {
    const all = await productsManager.readAll();

    const data = {
      title: "Home",
      products: all,
    };
    return res.status(200).render("index", data);
  } catch (error) {
    next(error);
  }
};

const productView = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    const data = {
      title: "Product",
      product: one,
    };
    return res.status(200).render("product", data);
  } catch (error) {
    next(error);
  }
};

const cartView = (req, res, next) => {
  try {
    const data = {
      title: "Cart",
    };
    return res.status(200).render("cart", data);
  } catch (error) {
    next(error);
  }
};

const profileView = (req, res, next) => {
  try {
    const data = {
      title: "Profile",
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
    return res.status(200).render("realRegister", data);
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
    return res.status(200).render("userRegister", data);
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
};
