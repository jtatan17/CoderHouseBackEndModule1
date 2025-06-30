// carts.model.js
import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    products: [
      {
        product_id: { type: Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    state: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
      index: true,
    },
  },
  { timestamps: true }
);

// Add population for queries
const populateOptions = [
  { path: "user_id", select: "email avatar" },
  { path: "products.product_id", select: "title price stock image" },
];

schema.pre("find", function () {
  this.populate(populateOptions);
});
schema.pre("findOne", function () {
  this.populate(populateOptions);
});
schema.pre("findOneAndUpdate", function () {
  this.populate(populateOptions);
});
schema.pre("findOneAndDelete", function () {
  this.populate(populateOptions);
});

const Cart = model(collection, schema);
export default Cart;
