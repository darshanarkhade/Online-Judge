import createError from "../utils/createError.js";

export const isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "You are not authorized"));
  }
  next();
};
