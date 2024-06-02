import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Auth token is missing" });
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY); 
    if (!decodedToken.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = decodedToken; // Add the decoded token to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
