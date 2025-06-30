import userRepository from "../repositories/user.repository.js";

const createUserMock = async (req, res, next) => {
  try {
    const one = await userRepository.createMock();
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const one = await userRepository.create(req.body);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const readOneUser = async (req, res, next) => {
  try {
    const one = await userRepository.readById(req.params.uid);
    if (!one) throw new Error("Not found");
    return res.status(200).json({ response: one });
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
};

const readUsers = async (req, res, next) => {
  try {
    const all = await userRepository.readAll(req.query.category);
    if (!all.length) throw new Error("Not found");
    return res.status(200).json({ response: all });
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const one = await userRepository.deleteById(req.params.uid);
    if (!one) throw new Error("Not found");
    return res.status(200).json({ response: one });
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const one = await userRepository.updateById(req.params.uid, req.body);
    if (!one) throw new Error("Not found");
    return res.status(200).json({ response: one });
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
};

const findByName = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("User not found");
    return res
      .status(200)
      .json(`The user ${user.name} has the role of ${user.role}`);
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
};

const routeNotFound = async (req, res, next) => {
  res.status(400).send("Can not get that URL");
};

const routeParam = async (req, res, next, name) => {
  try {
    const result = await userRepository.readByName(name);
    if (!result) throw new Error("User not found");
    req.user = result;
    next();
  } catch (error) {
    req.user = null;
    error.statusCode = error.statusCode || 404;
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
