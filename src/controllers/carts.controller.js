import cartsManager from "../Data/mongo/carts.mongo.js";
import productsManager from "../Data/mongo/products.mongo.js";

import cartRepository from "../repositories/cart.repository.js";
import productRepository from "../repositories/product.repository.js";

const readProductsByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const all = await cartRepository.readProductsByUser(user_id);
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
    const one = await cartRepository.addProductToCart(
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
    const one = await cartRepository.updateQuantity(cart_id, quantity);
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
    const one = await cartRepository.removeProductFromCart(cart_id);
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

const validateProduct = async (req, res, next) => {
  try {
    const product = await productRepository.readById(req.params.pid);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image || "https://via.placeholder.com/150",
        stock: product.stock,
      },
    });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during validation",
    });
  }
};

const getSessionCart = async (req, res, next) => {
  try {
    const cart = req.session.cart || [];
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const syncSessionCart = async (req, res) => {
  try {
    req.session.cart = req.body.cart;
    res.status(200).json({ message: "Cart synced" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart data",
      });
    }

    const stockIssues = await cartRepository.validateStock(cart);

    if (stockIssues.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Stock validation failed",
        issues: stockIssues,
      });
    }

    res.status(200).json({
      success: true,
      message: "All products are available in requested quantities",
    });
  } catch (error) {
    next(error);
  }
};

const processCheckout = async (req, res, next) => {
  try {
    const { user_id, cart } = req.body;
    console.log("👤 user_id:", user_id);
    console.log("🛒 cart items:", cart);
    // First validate stock
    const stockIssues = await cartRepository.validateStock(cart);
    if (stockIssues.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Checkout failed due to stock issues",
        issues: stockIssues,
      });
    }

    // Update product stocks
    for (const item of cart) {
      await productRepository.updateStock(
        item.product_id,
        -item.quantity // Subtract from stock
      );
    }

    // Create completed cart
    const completedCart = await cartRepository.createOrUpdateCart(
      user_id,
      cart
    );
    await completedCart.updateOne({ state: "completed" });

    res.status(200).json({
      success: true,
      message: "Checkout completed successfully",
      cart: completedCart,
    });
    console.log("📦 Incoming checkout payload:", req.body);
    console.log("🔍 Checkout payload:", JSON.stringify(req.body, null, 2));
  } catch (error) {
    next(error);
  }
};

export {
  addProductToCart,
  readProductsByUser,
  updateQuantity,
  removeProductFromCart,
  validateProduct,
  getSessionCart,
  syncSessionCart,
  validateCart,
  processCheckout,
};
