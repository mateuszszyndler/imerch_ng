import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { errorHandler } from "../helpers/eventHandler.js";
import createError from "http-errors";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw createError(401, "Not authenticated");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.getUserById(decoded.id); // Retrieve user by ID using the updated UserModel
    if (!user) {
      throw createError(404, "User not found");
    }

    if (user.passwordChangedAfter(decoded.iat)) {
      throw createError(401, "Password changed recently. Please login again.");
    }

    req.user = user;
    next();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const hasRole = (roles) => (req, res, next) => {
  try {
    if (!req.user || !roles.includes(req.user.role)) {
      throw createError(403, "Forbidden");
    }
    next();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
