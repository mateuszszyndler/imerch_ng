import jwt from "jsonwebtoken";
import User from "../models/User.js";
import passport from "../config/passport.js";
import { hashPassword, verifyPassword } from "../helpers/passwordHandler.js";

export const registerUser = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: 'client',
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.JWT_ACCESS_EXPIRATION) * 1000,
    });
    res.status(201).json({ user: newUser, token: token }); // Return user object along with the token
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).json({ message: "Authentication failed", error: info });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          maxAge: Number(process.env.JWT_ACCESS_EXPIRATION) * 1000,
        });
        return res.status(200).json({ user: user, token: token }); // Return user object along with the token
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};



export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out" });
};

export const socialLogin = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.JWT_ACCESS_EXPIRATION) * 1000,
  });
  res.status(200).json({ jwt: token });
};

const authController = {
  registerUser,
  loginUser,
  logoutUser,
  socialLogin,
};

export default authController;
