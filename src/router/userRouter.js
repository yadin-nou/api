import express from "express";
const userRouter = express.Router();
import mongoose from "mongoose";

//database table select
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
    min: 1,
    // max: 100,
    //we can overight message error message
    max: [100, "Are you sure for too much hours?"],
  },
  type: {
    type: String,
    default: "entry",
    //this field is default entry,
    //the field must be entry or bad
    enum: ["entry", "bad"],
  },
});
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
  try {
    const result = await taskCollection(req.body).save();
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
