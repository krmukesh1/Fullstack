const express = require("express");
const router = express.Router();
const User = require("../modal/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../components/middleware/authMiddleware");
require("dotenv").config();
const secreteKey = process.env.SecreteKey;
// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields is Require!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ status: true, message: "Registred Successfully!" });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields is Require!" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: true, message: "Invalid Credential" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secreteKey, {
      expiresIn: "3hr",
    });
    return res
      .status(201)
      .json({ status: true, message: "Login Successfully!", token: token });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// Profile

router.post("/profile", authMiddleware, async (req, res) => {
  try {
    // Below comented code is initial code later i have created middle ware so all those code in authmidlleware file
    // // this below code is commented beacuse i initialy i used token from login response token
    // const token = req.headers?.authorization?.split(" ")[1];

    // we will get the token from header cookies
    // const token = req?.headers?.cookie?.split("=")[1];
    // const token = req?.cookies?.authToken;
    // console.log(token);
    // if (!token) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Access Denied",
    //   });
    // }
    // jwt.verify(token, secreteKey, async (err, decode) => {
    //   const user = await User.findById(decode?.id);
    //   if (!user) {
    //     return res.status(400).json({
    //       status: false,
    //       message: "Invalid Token",
    //     });
    //   }
    // console.log(req.user);
    // const userData = {
    //   id: req.user?.id,
    //   name: req.user?.name,
    //   email: req.user?.email,
    // };
    // return res
    //   .status(201)
    //   .json({ status: true, message: "Profile Data", data: userData });

    const userData = req.user;
    return res
      .status(201)
      .json({ status: true, message: "Profile Data", data: userData });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(201).json({ status: true, message: "logout success" });
});

module.exports = router;
