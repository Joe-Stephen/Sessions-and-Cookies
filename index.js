import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongoConnect.js";
import userRouter from "./routers/userRoutes.js";
dotenv.config();
const app = express();
const port = 3001;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectMongoDB();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
