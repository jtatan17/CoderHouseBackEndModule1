import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/Data/fs/files/users.json";

class UsersManager {
  constructor() {
    this.path = path;
    this.init();
  }
  async init() {
    try {
      await fs.access(this.path);
      // console.log("Checking file existence:", this.path);
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([]));
    }
  }
  async readFile() {
    try {
      let data = await fs.readFile(this.path);
      data = JSON.parse(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async writeFile(data) {
    try {
      data = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, data);
    } catch (error) {
      throw error;
    }
  }
  async createMock() {
    try {
      const _id = faker.database.mongodbObjectId();
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const jobTitle = faker.person.jobTitle();
      const userPhone = faker.phone.number({ style: "national" });
      const userLocation = faker.location.city();
      const newUser = {
        _id,
        firstName,
        lastName,
        jobTitle,
        userPhone,
        userLocation,
      };
      //una vez construido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo producto
      dataOfFile.push(newUser);
      //se sobre escribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno el nuevo producto al cliente
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      const _id = faker.database.mongodbObjectId();
      const newUser = {
        _id,
        ...data,
      };
      //una vez construido el producto
      //se lee el archivo
      const dataOfFile = await this.readFile();
      //se pushea el nuevo producto
      dataOfFile.push(newUser);
      //se sobre escribe el archivo con la nueva data
      await this.writeFile(dataOfFile);
      //retorno el nuevo producto al cliente
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async readAll(category) {
    try {
      let all = await this.readFile();
      if (category) {
        all = all.filter((each) => each.category === category);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readById(id) {
    try {
      const all = await this.readFile();
      const one = all.find((each) => each._id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async updateById(id, newData) {
    try {
      const all = await this.readFile();
      const index = all.findIndex((product) => product._id === id);
      if (index === -1) {
        const error = new Error(`Product with ID ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      all[index] = { ...all[index], ...newData };
      await this.writeFile(all);
      return all[index];
    } catch (error) {
      throw error;
    }
  }
  async deleteById(id) {
    try {
      const all = await this.readFile();
      const index = all.findIndex((product) => product._id === id);
      if (index === -1) {
        const error = new Error(`Product with ID ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      const [removedProduct] = all.splice(index, 1);
      await this.writeFile(all);
      return removedProduct;
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UsersManager();
export default usersManager;
