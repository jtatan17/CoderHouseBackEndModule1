import usersLogInManager from "../Data/mongo/userLogIn.mongo.js";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersLogInManager.validateUser(email, password);
    return res.status(201).json({
      message: "Login successful",
      method: req.method,
      url: req.url,
      response: user,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
