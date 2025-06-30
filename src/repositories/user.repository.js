// src/repositories/user.repository.js
// import usersManager from "../Data/mongo/users.mongo.js";
import { userService as usersManager } from "../services/factory.js";
import { createHash } from "../helpers/bcrypt.helper.js";

class UserRepository {
  async register(userDTO) {
    const existing = await usersManager.readBy({ email: userDTO.email });
    if (existing) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = createHash(userDTO.password);
    const newUser = {
      name: userDTO.name,
      email: userDTO.email,
      password: hashedPassword,
      avatar: userDTO.avatar,
      age: userDTO.age,
      role: userDTO.role,
    };

    const created = await usersManager.create(newUser);
    return created;
  }

  async create(data) {
    return await usersManager.create(data);
  }

  async createMock() {
    return await usersManager.createMock();
  }

  async readAll(category) {
    return await usersManager.readAll(category);
  }

  async readById(id) {
    return await usersManager.readById(id);
  }

  async deleteById(id) {
    return await usersManager.deleteById(id);
  }

  async updateById(id, data) {
    return await usersManager.updateById(id, data);
  }

  async readByName(name) {
    return await usersManager.readByName(name);
  }

  async readBy(filter) {
    return await usersManager.readBy(filter);
  }
}

export default new UserRepository();
