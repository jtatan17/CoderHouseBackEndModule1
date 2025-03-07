//import usersManager from "../Data/fs/users.fl.js";
import usersManager from "../Data/mongo/users.mongo.js";

const createUserMock = async (req, res, next) => {
  try {
    const one = await usersManager.createMock();
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readById(uid);
    if (one) {
      return res.status(200).json({ response: one });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const readUsers = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await usersManager.readAll(category);
    if (all.length === 0) {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ response: all });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.deleteById(uid);
    if (one) {
      return res.status(200).json({ response: one });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.updateById(uid, data);
    if (one) {
      return res.status(200).json({ response: one });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export {
  createUserMock,
  createUser,
  readOneUser,
  readUsers,
  deleteUser,
  updateUser,
};
