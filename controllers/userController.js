import bcrypt from "bcrypt";
import User from "../models/user.js";

export const loadUserLogin = async (req, res) => {
  try {
    //loading login page
    res.render("login.ejs");
  } catch (error) {
    console.error("Error while loading user login page.");
    res.send("Error while loading user login page.");
  }
};

export const loadUserRegister = async (req, res) => {
  try {
    //loading register page
    res.render("register.ejs");
  } catch {
    console.error("Error while loading user registration page.");
    res.send("Error while loading user registration page.");
  }
};

export const validateUserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    //finding the user
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.send("Invalid username or password.");
    }
    //comparing the passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error while comparing password :", err);
        return res.send("Error while comparing password.");
      }
      return !result ? res.send("Wrong password.") : res.render("secrets.ejs");
    });
  } catch (error) {
    console.error("Error while validating user login.");
    res.send("Error while validating user login.");
  }
};

export const registerNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.send("A user with this email already exists!");
    }
    //hashing password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error("Error while hashing password :", err);
        return res.send("Error while hashing password.");
      }
      //creating new user
      const user = await User.create({ username: username, password: hash });
      return res.render("secrets.ejs");
    });
  } catch (error) {
    console.error("Error while registering user.");
    res.send("Error while registering user.");
  }
};

export const logoutUser = async (req, res) => {
  try {
    //loading home page
    res.redirect("/");
  } catch (error) {
    console.error("Error while logging out user.");
    res.send("Error while logging out user.");
  }
};
