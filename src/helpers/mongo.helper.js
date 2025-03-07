import { connect } from "mongoose";

async function connectMongo(link) {
  try {
    await connect(link);
    console.log("Mongo database connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectMongo;
