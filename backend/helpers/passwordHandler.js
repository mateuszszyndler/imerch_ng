import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { eventHandler, errorHandler } from "./eventHandler.js";

dotenv.config();

const pepper = process.env.PEPPER_SECRET;

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
  const saltPepperedPassword = password + pepper;
  const hashedPassword = await bcrypt.hash(saltPepperedPassword, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const saltPepperedPassword = password + pepper;
  const isMatch = await bcrypt.compare(saltPepperedPassword, hashedPassword);
  return isMatch;
};


const PasswordTokenRefresh = async (req, res, next) => {
  try {
    const user = req.user;
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw createError(400, "Refresh token not provided");
    }

    // Verify existing refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw createError(401, "Invalid refresh token");
      }

      // Check if refresh token matches the one in database
      if (refreshToken !== user.password_refresh_token) {
        throw createError(403, "Refresh token mismatch");
      }

      // Check if decoded id is the same as user id
      if (decoded.id !== user._id.toString()) {
        throw createError(403, "Invalid refresh token for user");
      }

      // Create a new access token
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
      });

      // Create a new refresh token
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      });

      // Save new refresh token in database
      user.password_refresh_token = newRefreshToken;
      await user.save();

      eventHandler("info", "Access token refreshed", req);

      res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const PasswordTokenReset = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createError(404, "User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\n${process.env.CLIENT_URL}/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        throw err;
      }

      eventHandler("info", "Password reset email sent", req);

      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export { hashPassword, verifyPassword, PasswordTokenRefresh, PasswordTokenReset };
