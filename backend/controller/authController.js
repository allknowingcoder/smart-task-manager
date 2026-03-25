const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const User = require("../models/user.js");

exports.register = async (req, res) => {
  try {
    console.log("register hit");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

 const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({ msg: "User not found" });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({ msg: "Invalid credentials" });
}

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};
