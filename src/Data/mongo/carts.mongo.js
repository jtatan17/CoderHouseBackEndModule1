// carts.mongo.js
import Manager from "./manager.mongo.js";
import Cart from "./models/carts.model.js";

class CartsManager extends Manager {
  constructor() {
    super(Cart);
  }

  async createOrUpdateCart(user_id, products) {
    try {
      // Find existing cart for user
      let cart = await this.model.findOne({ user_id, state: "pending" });

      if (!cart) {
        cart = new this.model({ user_id, products });
      } else {
        // Merge products (update quantities if product exists)
        products.forEach((newProduct) => {
          const existingProduct = cart.products.find((p) =>
            p.product_id.equals(newProduct.product_id)
          );

          if (existingProduct) {
            existingProduct.quantity += newProduct.quantity;
          } else {
            cart.products.push(newProduct);
          }
        });
      }

      await cart.save();
      return cart.populate("products.product_id");
    } catch (error) {
      throw error;
    }
  }

  async validateStock(cartProducts) {
    try {
      const Product = this.model.db.model("products");
      const stockIssues = [];

      for (const item of cartProducts) {
        const product = await Product.findById(item.product_id);
        if (!product) {
          stockIssues.push({
            product_id: item.product_id,
            available: 0,
            required: item.quantity,
            message: "Product not found",
          });
        } else if (product.stock < item.quantity) {
          stockIssues.push({
            product_id: item.product_id,
            title: product.title,
            available: product.stock,
            required: item.quantity,
            message: `Only ${product.stock} available`,
          });
        }
      }

      return stockIssues;
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartsManager();
export default cartsManager;
