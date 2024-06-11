import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(createError(401, "Auth token is missing"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken.isAdmin) {
      return next(createError(403, "Access denied. Admins only."));
    }

    req.user = decodedToken; // Add the decoded token to the request object
    next();
  } catch (error) {
    next(createError(401, "Invalid token"));
  }
};
