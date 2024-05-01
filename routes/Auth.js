const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// User registration

router.post("/register", verifyToken, async (req, res) => {
  try {
    const { username, password, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      admin,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login

router.post("/login", async (req, res) => {
  console.log("login hitted");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/tokenValid", verifyToken, async (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = router;
