import express from "express";
const userRouter = express.Router();
let fakeDB = [];
userRouter.get("/", (req, res) => {
  res.status(201).json({
    task: fakeDB,
    sucess: "sucesss",
    message: "To do Get",
  });
});

userRouter.post("/", (req, res) => {
  //const taskList = { id: fakeDB.length + 1, ...req.body };
  fakeDB.push(req.body);
  res.status(201).json({
    sucess: "sucess",
    message: "Task added",
  });
});

userRouter.delete("/{:id}", (req, res) => {
  //+ convert from string to number
  const id = +req.params.id;
  fakeDB = fakeDB.filter((task) => task.id !== id);
  console.log(fakeDB, id);
  res.status(201).json({
    sucess: "sucess",
    message: "delete sucessfully",
  });
});

userRouter.patch("/", (req, res) => {
  fakeDB = fakeDB.filter((item) => {
    return item.id === +req.body.id ? (item.type = req.body.type) : item;
  });
  console.log(fakeDB);
  res.status(201).json({
    sucess: "sucess",
    message: "task updated",
  });
});
export default userRouter;
