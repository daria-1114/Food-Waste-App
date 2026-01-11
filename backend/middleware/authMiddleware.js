import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth.js";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token=req.headers.authorization;
  
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // This should leave ONLY the random characters
  }

  console.log("DEBUG: Raw Token being verified ->", token); // <--- LOOK AT THIS IN TERMINAL

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("JWT Error:", err.message); // This is where "jwt malformed" comes from
    res.status(401).json({ error: "Invalid token" });
  }
};