import productsManager from "../Data/mongo/products.mongo.js";
import productRepository from "../repositories/product.repository.js";

const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productRepository.readById(pid);
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

const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productRepository.readAll(category);
    const generalStock = "general stock " + all.length;
    if (all.length > 0) {
      return res.status(200).json({ response: all, generalStock });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Request body is missing or empty");
    }

    const data = req.body;
    const one = await productRepository.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const createProductMock = async (req, res, next) => {
  try {
    const one = await productRepository.createMock();
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productRepository.updateById(pid, data);
    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productRepository.deleteById(pid);
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

const paginate = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { docs, prevPage, nextPage } = await productRepository.paginate(
      page || 1,
      limit || 5
    );
    return res.status(200).json({
      method: req.method,
      url: req.url,
      response: { docs, prevPage, nextPage },
    });
  } catch (error) {
    next(error);
  }
};

export {
  readOneProduct,
  readProducts,
  createProduct,
  createProductMock,
  updateProduct,
  deleteProduct,
  paginate,
};
