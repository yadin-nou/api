import express from "express";
import {
  deleteTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/taskSchema.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const tasks = await getTasks();
  res.status(200).json({
    tasks,
    sucess: "sucesss",
    message: "To do Get",
  });
});

userRouter.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    console.log(result);

    res.status(201).json({
      sucess: "sucess",
      message: "Task added to database",
    });
  } catch (error) {
    res.status(201).json({
      sucess: "error",
      message: error.message,
    });
  }
});

userRouter.delete("/{:_id}", async (req, res) => {
  //+ convert from string to number
  // const id = +req.params.id;
  const { _id } = req.params;
  const result = await deleteTask(_id);
  console.log(result);
  res.status(200).json({
    sucess: "sucess",
    message: "delete sucessfully",
  });
});

userRouter.patch("/", async (req, res) => {
  const { _id, ...rest } = req.body;
  const result = await updateTask(_id, rest);
  console.log(result);
  res.status(200).json({
    sucess: "sucess",
    message: "task updated",
  });
});
export default userRouter;
