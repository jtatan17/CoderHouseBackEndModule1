// src/helpers/mongo.helper.js

import { connect } from "mongoose";

export default class MongoSingleton {
  static #instance;

  constructor() {}

  static async getInstance(link) {
    if (this.#instance) {
      console.log("✅ Ya se ha abierto una conexión a MongoDB.");
      return this.#instance;
    }

    try {
      await connect(link);
      console.log("✅ Conectado con éxito a MongoDB usando Singleton.");
      this.#instance = new MongoSingleton();
      return this.#instance;
    } catch (error) {
      console.error("❌ No se pudo conectar a MongoDB: " + error);
      process.exit(1); // Exit app if DB connection fails
    }
  }
}
