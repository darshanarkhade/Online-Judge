import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) return createError(403, "Token is not valid!");
    req.username = payload.id;
    req.isAdmin = payload.isAdmin;
  });
  next();
}; 
