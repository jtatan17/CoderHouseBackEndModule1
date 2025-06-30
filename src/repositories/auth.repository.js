import { userService as usersManager } from "../services/factory.js";
import { isValidPassword, createHash } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/tokens.helper.js";

class AuthRepository {
  async findUserByEmail(email) {
    return await usersManager.readBy({ email });
  }

  validatePassword(user, password) {
    return isValidPassword(user, password);
  }

  generateToken(user) {
    return generateToken(user);
  }

  //   async registerUser(data) {
  //     const { email, password } = data;
  //     const existing = await usersManager.readBy({ email });
  //     if (existing) throw new Error("User already exists");

  //     const hashedPassword = createHash(password);
  //     return await usersManager.create({ ...data, password: hashedPassword });
  //   }
}

export default new AuthRepository();
