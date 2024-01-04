const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    user.token = token;
    await user.save();

    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    console.error("Login Error:", err); // Log the error for debugging
    res.status(500).json("Internal Server Error"); // Send a generic error response
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming req.user._id holds the logged-in user's ID

    if (!user) {
      return res.status(404).json("User not found!");
    }
    user.token = undefined;
    await user.save();

    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//REFETCH USER
//REFETCH USER
router.get("/refetch", async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming req.user._id holds the logged-in user's ID

    if (!user || !user.token) {
      return res.status(404).json("Token not found!");
    }

    const token = user.token;

    jwt.verify(token, process.env.SECRET, {}, (err, data) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      res.status(200).json(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
