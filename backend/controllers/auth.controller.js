import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6) {
      return next(createError(400, 'Password must be at least 6 characters long'));
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return next(createError(400, 'Username already exists'));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(createError(400, 'Email already exists'));
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been registered");
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(createError(400, "Wrong Credentials"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "10y" }
    );

    const { password: userPassword, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 10*12*30*24*3600000,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("Logged out");
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};

export const isAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: 'Auth token is missing' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // Assuming decodedToken contains necessary user information
    res.status(200).json({ isAuthenticated: true, userData: decodedToken });
  } catch (error) {
    console.error('Invalid token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
