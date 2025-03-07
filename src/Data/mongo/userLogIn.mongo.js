import Manager from "./manager.mongo.js";
import Users from "./models/users.model.js";

class UserLogInManager extends Manager {
  constructor() {
    super(Users);
  }

  async validateUser(email, password) {
    try {
      const user = await this.readOne({ email }); // Find user by email

      if (!user) {
        throw new Error("User not found");
      }

      if (password !== user.password) {
        // Simple string comparison
        throw new Error("Invalid password");
      }

      return user; // Return user data if valid
    } catch (error) {
      throw error;
    }
  }
}

const usersLogInManager = new UserLogInManager();
export default usersLogInManager;
