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

const findByName = async (req, res, next) => {
  try {
    // const { word } = req.params;
    // const user = await usersManager.readByName(word);

    const user = req.user;
    console.log(user);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json(`The user ${user.name} has the role of ${user.role}`);
  } catch (error) {
    next(error);
  }
};

const routeNotFound = async (req, res, next) => {
  res.status(400).send("Can not get that URL");
};

const routeParam = async (req, res, next, name) => {
  console.log("Buscando el rol del usuario con el nombre:" + name);
  try {
    const result = await usersManager.readByName(name);
    console.log(result);
    if (!result) {
      req.user = null;
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    } else {
      req.user = result;
    }
    next();
  } catch (error) {
    console.error("Ocurrio un error" + error.message);
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
  findByName,
  routeNotFound,
  routeParam,
};
