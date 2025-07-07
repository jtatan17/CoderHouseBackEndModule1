// src/Data/fs/carts.fs.js
import fs from "fs/promises";
import path from "path";
import { faker } from "@faker-js/faker";

const filePath = "./src/Data/fs/files/carts.json";

class CartsManagerFS {
  constructor() {
    this.path = filePath;
    this.init();
  }

  async init() {
    try {
      await fs.access(this.path);
    } catch {
      await fs.writeFile(this.path, JSON.stringify([]));
    }
  }

  async readFile() {
    const content = await fs.readFile(this.path, "utf-8");
    return JSON.parse(content);
  }

  async writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async readProductsByUser(user_id) {
    const carts = await this.readFile();
    const cart = carts.find(
      (c) => c.user_id === user_id && c.state === "pending"
    );
    return cart ? cart.products : [];
  }

  async addProductToCart(user_id, product_id, quantity) {
    const carts = await this.readFile();
    let cart = carts.find(
      (c) => c.user_id === user_id && c.state === "pending"
    );

    if (!cart) {
      cart = {
        _id: faker.database.mongodbObjectId(),
        user_id,
        products: [],
        state: "pending",
      };
      carts.push(cart);
    }

    const existing = cart.products.find((p) => p.product_id === product_id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product_id, quantity });
    }

    await this.writeFile(carts);
    return cart;
  }

  async updateQuantity(cart_id, { product_id, quantity }) {
    const carts = await this.readFile();
    const cart = carts.find((c) => c._id === cart_id);

    if (!cart) return null;

    const item = cart.products.find((p) => p.product_id === product_id);
    if (item) {
      item.quantity = quantity;
      await this.writeFile(carts);
      return cart;
    }

    return null;
  }

  async removeProductFromCart(cart_id) {
    const carts = await this.readFile();
    const index = carts.findIndex((c) => c._id === cart_id);

    if (index === -1) return null;

    const [removed] = carts.splice(index, 1);
    await this.writeFile(carts);
    return removed;
  }

  async validateStock(cart) {
    // This should ideally compare with FileSystem-based ProductsManager
    const { default: productManager } = await import("./products.fs.js");
    const pm = new productManager();

    const issues = [];

    for (const item of cart) {
      const product = await pm.readOne(item.product_id);
      if (!product) {
        issues.push({
          product_id: item.product_id,
          available: 0,
          required: item.quantity,
          message: "Product not found",
        });
      } else if (product.stock < item.quantity) {
        issues.push({
          product_id: item.product_id,
          title: product.title,
          available: product.stock,
          required: item.quantity,
          message: `Only ${product.stock} available`,
        });
      }
    }

    return issues;
  }

  async createOrUpdateCart(user_id, products) {
    const carts = await this.readFile();
    let cart = carts.find(
      (c) => c.user_id === user_id && c.state === "pending"
    );

    if (!cart) {
      cart = {
        _id: faker.database.mongodbObjectId(),
        user_id,
        products: [...products],
        state: "pending",
      };
      carts.push(cart);
    } else {
      for (const newProduct of products) {
        const existing = cart.products.find(
          (p) => p.product_id === newProduct.product_id
        );
        if (existing) {
          existing.quantity += newProduct.quantity;
        } else {
          cart.products.push(newProduct);
        }
      }
    }

    await this.writeFile(carts);
    return cart;
  }
}

export default CartsManagerFS;
