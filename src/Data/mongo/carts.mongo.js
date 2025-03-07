import Manager from "./manager.mongo.js";
import Cart from "./models/carts.model.js";

class CartsManager extends Manager {
  constructor() {
    super(Cart);
  }
  addProductToCart = async (user_id, product_id, quantity) => {
    try {
      const one = this.create({ user_id, product_id, quantity });
      return one;
    } catch (error) {
      throw error;
    }
  };
  removeProductFromCart = async (cid) => {
    try {
      const one = await this.deleteById(cid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateQuantity = async (cart_id, quantity) => {
    try {
      const one = await this.updateById(cart_id, quantity);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readProductsByUser = async (user_id) => {
    try {
      const all = await this.readAll({ user_id, state: "reserved" });
      return all;
    } catch (error) {
      throw error;
    }
  };
}

const cartsManager = new CartsManager();
export default cartsManager;
