import express from "express";
import passport from "../config/passport.js";
import authController from "../controllers/AuthController.js";
import { PasswordTokenRefresh, PasswordTokenReset } from "../helpers/passwordHandler.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.post("/register", Validator, authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/token/refresh", PasswordTokenRefresh);
router.post("/password/reset", PasswordTokenReset);

const authenticateWithRedirect = (service) => passport.authenticate(service, { scope: ["email", "profile"] });

const authenticateWithCallback = (service) => (req, res, next) =>
  passport.authenticate(service, { scope: ["email", "profile"], session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed", error: info });
    }
    req.user = user;
    next();
  })(req, res, next);

const services = ["google", "facebook", "apple"];
services.forEach((service) => {
  router.get(`/${service}`, authenticateWithRedirect(service));
  router.get(`/${service}/callback`, authenticateWithCallback(service), authController.socialLogin);
});

export default router;
