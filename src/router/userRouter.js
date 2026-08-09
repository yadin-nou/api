import express from "express";
import {
  deleteTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/taskSchema.js";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    tasks
      ? res.status(200).json({
          task: tasks,
          status: "sucess",
          message: "Fetch data sucessfully",
        })
      : res.status(200).json({
          status: "error",
          message: "Fetch data unsucessfully",
        });
  } catch (error) {
    res.status(200).json({
      status: "sucess",
      message: error.message,
    });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const result = await insertTask(req.body);
    //     The ?. checks: "is the thing on the left (result) null or undefined?"
    // If yes → stop immediately and return undefined, without even trying to read _id.
    // If no → go ahead and read result._id normally. and _id will respons sucess message
    //or error message
    result?._id
      ? res.status(201).json({
          status: "sucess",
          message: "Task added sucessfuly",
        })
      : res.status(201).json({
          status: "erorr",
          message: "Error add to database",
        });
  } catch (error) {
    res.status(201).json({
      status: "error",
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
  try {
    const { _id, ...rest } = req.body;
    //console.log(req.body);
    const result = await updateTask(_id, rest);
    console.log(result);
    result?._id
      ? res.status(200).json({
          task: result,
          status: "sucess",
          message: "swich task sucessfully.",
        })
      : res.status(200).json({
          status: "error",
          message: "switch task unsucessfully",
        });
  } catch (error) {
    res.status(200).json({
      status: "sucess",
      message: error.message,
    });
  }
});
export default userRouter;
