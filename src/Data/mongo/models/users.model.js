import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "master"],
      index: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/266/266033.png",
    },
  },
  { timestamps: true }
);

const Users = model(collection, schema);

export default Users;
