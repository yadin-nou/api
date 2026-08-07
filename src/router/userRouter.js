import express from "express";
const userRouter = express.Router();
import mongoose from "mongoose";

//database table select
const taskSchema = new mongoose.Schema({}, { strict: false });
const taskCollection = mongoose.model("task", taskSchema);

userRouter.get("/", async (req, res) => {
  const tasks = await taskCollection.find();
  res.status(201).json({
    tasks,
    sucess: "sucesss",
    message: "To do Get",
  });
});

userRouter.post("/", async (req, res) => {
  const result = await taskCollection(req.body).save();
  res.status(201).json({
    sucess: "sucess",
    message: "Task added to database",
  });
});

userRouter.delete("/{:_id}", async (req, res) => {
  //+ convert from string to number
  // const id = +req.params.id;
  const { _id } = req.params;
  const result = await taskCollection.findByIdAndDelete(_id);
  res.status(201).json({
    sucess: "sucess",
    message: "delete sucessfully",
  });
});

userRouter.patch("/", async (req, res) => {
  const { _id, ...rest } = req.body;
  const result = await taskCollection.findByIdAndUpdate(_id, rest);
  res.status(201).json({
    sucess: "sucess",
    message: "task updated",
  });
});
export default userRouter;
