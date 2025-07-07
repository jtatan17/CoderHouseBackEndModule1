// import cartsManager from "../Data/mongo/carts.mongo.js";
import { cartService as cartsManager } from "../services/factory.js";

class CartRepository {
  readProductsByUser(user_id) {
    return cartsManager.readProductsByUser(user_id);
  }

  addProductToCart(user_id, product_id, quantity) {
    return cartsManager.addProductToCart(user_id, product_id, quantity);
  }

  updateQuantity(cart_id, quantity) {
    return cartsManager.updateQuantity(cart_id, quantity);
  }

  removeProductFromCart(cart_id) {
    return cartsManager.removeProductFromCart(cart_id);
  }

  validateStock(cart) {
    return cartsManager.validateStock(cart);
  }

  createOrUpdateCart(user_id, cart) {
    return cartsManager.createOrUpdateCart(user_id, cart);
  }
}

export default new CartRepository();
