import cartsManager from "../Data/mongo/carts.mongo.js";

const readProductsByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const all = await cartsManager.readProductsByUser(user_id);
    if (all.length > 0) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: all,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const one = await cartsManager.addProductToCart(
      user_id,
      product_id,
      quantity
    );
    return res.status(201).json({
      method: req.method,
      url: req.url,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const quantity = req.body;
    const one = await cartsManager.updateQuantity(cart_id, quantity);
    if (one) {
      return res
        .status(200)
        .json({ method: req.method, url: req.url, response: one });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

const removeProductFromCart = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    const one = await cartsManager.removeProductFromCart(cart_id);
    if (one) {
      return res
        .status(200)
        .json({ method: req.method, url: req.url, response: one });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

export {
  addProductToCart,
  readProductsByUser,
  updateQuantity,
  removeProductFromCart,
};
