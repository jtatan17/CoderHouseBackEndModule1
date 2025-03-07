class Manager {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readAll = async (filter) => {
    try {
      const all = await this.model.find(filter);
      return all;
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const one = await this.model.findById(id);
      return one;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (data) => {
    try {
      const one = await this.model.findOne(data);
      return one;
    } catch (error) {
      throw error;
    }
  };

  updateById = async (id, data) => {
    try {
      //Devuelve el objeto luego de la modificacion
      const opts = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };

  updateOne = async (filter, data) => {
    try {
      //Devuelve el objeto luego de la modificacion
      const opts = { new: true };
      const one = await this.model.findByOneAndUpdate(filter, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };

  deleteById = async (id) => {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (filter) => {
    try {
      const one = await this.model.findOneAndDelete(filter);
      return one;
    } catch (error) {
      throw error;
    }
  };

  paginate = async (page, limit) => {
    try {
      const all = await this.model.paginate({}, { page, limit });
      return all;
    } catch (error) {
      throw error;
    }
  };
}

export default Manager;
