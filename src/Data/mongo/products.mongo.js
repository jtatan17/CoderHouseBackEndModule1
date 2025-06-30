// products.mongo.js
import Product from "./models/products.model.js";
import Manager from "./manager.mongo.js";

class ProductsManager extends Manager {
  async updateStock(productId, quantityChange) {
    try {
      const product = await this.model.findById(productId);
      if (!product) throw new Error("Product not found");

      product.stock += quantityChange;

      if (product.stock < 0) {
        throw new Error("Insufficient stock");
      }

      // ✅ Make sure image is a string, not an array
      if (Array.isArray(product.image)) {
        product.image = product.image[0] || "https://via.placeholder.com/150";
      }

      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager(Product);
export default productsManager;
