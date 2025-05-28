import bcrypt from "bcrypt";

//Hash password

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validate passowrd

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
