const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user");
require("dotenv").config();

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let { username, password } = req.body;

    // validate

    if (!username || !password)
      return res.status(400).json({ msg: "enter username and password" });
    if (password.length < 4)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ username: username });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate
    if (!username || !password)
      return res.status(400).json({ msg: "Enter username and password." });

    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;
