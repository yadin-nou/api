import express from "express";
import userRouter from "./src/router/userRouter.js";
import morgan from "morgan";
const app = express();
const PORT = 8000;
//morgan to tell http reqest path you send in console
app.use(morgan("tiny"));
//use for json data req.query
app.use(express.json());
//use for form submit req.body
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);

// app.use("/", (req, res) => {
//   res.json({
//     status: "sucess",
//     message: "todo",
//   });
// });
// app.get("/", (req, res) => {
//   console.log(req.body);
// });

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});
