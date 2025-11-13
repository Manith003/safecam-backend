const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};

async function registerUser(req, res) {
  const { username, password } = req.body;

  const isUserExist = await userModel.findOne({ username });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists! Please login.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username: username,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECREAT
  );

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  const userExist = await userModel.findOne({
    username,
  });

  if (!userExist) {
    return res.status(400).json({ message: "Invalid username" });
  }

  const isPasswordValid = await bcrypt.compare(password, userExist.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: userExist._id,
    },
    process.env.JWT_SECREAT
  );

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "Login successful",
    userExist,
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "Logout successful",
  });
}


async function userController(req, res) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized token not found. login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECREAT);
    const user = await userModel.findById(decoded.id).select("-password");
    res.status(200).json({
      message: "user data found",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, userController };
