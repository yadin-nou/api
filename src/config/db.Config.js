import mongoose from "mongoose";
// const mongoLink = "mongodb://127.0.0.1:27017/task_ntdl";
const mongoLink = process.env.MONGO_URL;

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(mongoLink);
    conn && console.log("DB connect");
  } catch (error) {
    console.log(error);
  }
};
