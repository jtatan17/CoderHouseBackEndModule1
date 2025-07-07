import { productService as productsManager } from "../services/factory.js";

class ProductRepository {
  readById(pid) {
    return productsManager.readById(pid);
  }

  readAll(category) {
    return productsManager.readAll(category);
  }

  create(data) {
    return productsManager.create(data);
  }

  updateById(pid, data) {
    return productsManager.updateById(pid, data);
  }

  deleteById(pid) {
    return productsManager.deleteById(pid);
  }

  paginate(page = 1, limit = 5) {
    return productsManager.paginate(page, limit);
  }

  createMock() {
    return productsManager.createMock();
  }

  updateStock(productId, quantityChange) {
    return productsManager.updateStock(productId, quantityChange);
  }

  readOne(data) {
    return productsManager.readOne(data);
  }

  updateOne(filter, data) {
    return productsManager.updateOne(filter, data);
  }

  deleteOne(filter) {
    return productsManager.deleteOne(filter);
  }
}

export default new ProductRepository();
