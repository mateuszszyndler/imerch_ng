import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as AppleStrategy } from "passport-apple";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import { hashPassword, verifyPassword } from "../helpers/passwordHandler.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Name of the field which holds the email
      passwordField: "password", // Name of the field which holds the password
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter("jwt"), ExtractJwt.fromBodyField("jwt"), ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      failureRedirect: "/login", // redirect to the login page if there is an error
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          "auth_methods.auth_method": "google",
          "auth_methods.provider_id": profile.id,
        });
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            auth_methods: [{ auth_method: "google", provider_id: profile.id }],
            is_active: true,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      failureRedirect: "/login", // redirect to the login page if there is an error
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          "auth_methods.auth_method": "facebook",
          "auth_methods.provider_id": profile.id,
        });
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            auth_methods: [{ auth_method: "facebook", provider_id: profile.id }],
            is_active: true,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      keyID: process.env.APPLE_KEY_ID,
      keyPath: process.env.APPLE_KEY_PATH,
      failureRedirect: "/login", // redirect to the login page if there is an error
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          "auth_methods.auth_method": "apple",
          "auth_methods.provider_id": profile.id,
        });
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            auth_methods: [{ auth_method: "apple", provider_id: profile.id }],
            is_active: true,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
