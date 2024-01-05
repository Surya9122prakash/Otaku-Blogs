const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken")

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
router.post("/logout",verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
      return res.status(404).json("User not Logged In!");
    }

    // Find the user associated with the token
    const user = await User.findOne({ token });

    // Check if the user exists
    if (!user) {
      return res.status(404).json("User not Logged In!");
    }

    // Invalidate the token by removing it from the user document
    user.token = undefined;
    await user.save();

    // Clear the token cookie from the client
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});


//REFETCH USER
router.get("/refetch", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
