import express from "express";
import userRouter from "./src/router/userRouter.js";
import morgan from "morgan";
import { connectMongoDB } from "./src/config/db.Config.js";
import cors from "cors";
const app = express();
const PORT = 8000;
//MongoDB connection
connectMongoDB();
// use cors to tell server that we can send data through
app.use(cors());
//morgan to tell http reqest path you send in console
app.use(morgan("tiny"));
//use for json data req.query
app.use(express.json());
//use for form submit req.body
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/tasks", userRouter);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});
