import mongoose from "mongoose";
// const mongoLink = "mongodb://127.0.0.1:27017/task_ntdl";
const mongoLink =
  "mongodb+srv://nouyadin_db_user:RUkYoUGpU3N4SBty@online-db.izzxdtk.mongodb.net/?appName=Online-db";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(mongoLink);
    conn && console.log("DB connect");
  } catch (error) {
    console.log(error);
  }
};
