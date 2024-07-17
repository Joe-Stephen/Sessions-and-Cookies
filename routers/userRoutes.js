import express from "express";
import {
  loadUserLogin,
  loadUserRegister,
  logoutUser,
  registerNewUser,
  validateUserLogin,
} from "../controllers/userController.js";
const userRouter = express.Router();

//user routes
userRouter.get("/login", loadUserLogin);
userRouter.get("/register", loadUserRegister);
userRouter.post("/login", validateUserLogin);
userRouter.post("/register", registerNewUser);
userRouter.get("/logout", logoutUser);
export default userRouter;
