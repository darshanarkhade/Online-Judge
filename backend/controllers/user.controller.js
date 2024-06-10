import User from '../models/user.model.js';
import createError from "../utils/createError.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.username);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json({ ...user._doc, password: '********' });
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};
