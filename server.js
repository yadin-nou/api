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
//OR to open permersion for data sending too.
app.use(cors());
//morgan to tell http reqest path you send in console
app.use(morgan("tiny"));
//use for json data req.body
app.use(express.json());
//use for html form submit req.query
app.use(express.urlencoded({ extended: true }));
//static servering path
import path from "path";
const __dirName = path.resolve();
//serve the static file for dist folder (react build folder)
const joinFile = path.join(__dirName, "dist");
app.use(express.static(joinFile));
//start run static file in dist folder of react
app.get("/", (req, res) => {
  res.sendFile(joinFile, "index.html");
});

//user express router
app.use("/api/v1/tasks", userRouter);
app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("http://localhost:" + PORT);
});
