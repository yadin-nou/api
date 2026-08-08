import mongoose from "mongoose";

//database table select
const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    hour: {
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
  },
  { timestamps: true },
);
const taskCollection = mongoose.model("task", taskSchema);

export const insertTask = (taskObj) => {
  return taskCollection(taskObj).save();
};
export const getTasks = () => {
  return taskCollection.find();
};
export const deleteTask = (_id) => {
  return taskCollection.findByIdAndDelete(_id);
};
export const updateTask = (_id, rest) => {
  return taskCollection.findByIdAndUpdate(_id, rest);
};
