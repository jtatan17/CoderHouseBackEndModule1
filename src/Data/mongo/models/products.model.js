import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    stock: { type: Number, default: 100 },
    price: { type: Number, default: 100 },
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg",
    },

    category: { type: String, default: "none", index: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
