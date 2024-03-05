import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import axios from "axios";
import { errorHandler, eventHandler } from "./helpers/eventHandler.js";
import passport from "passport";
import connectDB from "./config/db.config.js";
import "./config/passport.js";
import Validator from "./validators/Validator.js";

dotenv.config();
const port = process.env.SERVER_PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Import Routes
import predefinedRoutes from "./routes/PredefinedRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import subscriptionRoutes from "./routes/SubscriptionRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";
import designRoutes from "./routes/DesignRoutes.js";
import shippingRoutes from "./routes/ShippingRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import blogRoutes from "./routes/BlogRoutes.js";
import supportRoutes from "./routes/SupportRoutes.js";
import notificationRoutes from "./routes/NotificationRoutes.js";
import marketingRoutes from "./routes/MarketingRoutes.js";
import seoRoutes from "./routes/SeoRoutes.js";
import languageRoutes from "./routes/LanguageRoutes.js";
import faqRoutes from "./routes/FaqRoutes.js";
import themeRoutes from "./routes/ThemeRoutes.js";
import returnRoutes from "./routes/ReturnRoutes.js";
import payoutRoutes from "./routes/PayoutRoutes.js";
import storeRoutes from "./routes/StoreRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import analyticsRoutes from "./routes/AnalyticsRoutes.js";
import filterRoutes from "./routes/FilterRoutes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "worker-src": ["'self'", "blob:"],
      "frame-src": ["'self'", "https://accounts.google.com/"],
      "img-src": ["'self'", "https://*.googleusercontent.com"],
    },
  }),
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies in urlencoded format (extended: true allows for nested objects)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // limit each IP to 100 requests per windowMs
  })
);
app.use(passport.initialize());

// Connect to Database
connectDB();

// Middleware to set COOP headers
// Replace original middleware with new one
app.use((req, res, next) => {
  if (req.path !== '/api/auth' && req.path !== '/api/auth/google' && req.path !== '/api/auth/google/callback') {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  }
  next();
});


// Routes
app.use("/api/predefined", Validator, eventHandler("info", "predefinedRoutesAccess"), predefinedRoutes);
app.use("/api/product", Validator, eventHandler("info", "productRoutesAccess"), productRoutes);
app.use("/api/subscription", Validator, eventHandler("info", "subscriptionRoutesAccess"), subscriptionRoutes);
app.use("/api/comment", eventHandler("info", "commentRoutesAccess"), commentRoutes);
app.use("/api/design", Validator, eventHandler("info", "designRoutesAccess"), designRoutes);
app.use("/api/shipping", Validator, eventHandler("info", "shippingRoutesAccess"), shippingRoutes);
app.use("/api/payment", Validator, eventHandler("info", "paymentRoutesAccess"), paymentRoutes);
app.use("/api/cart", Validator, eventHandler("info", "cartRoutesAccess"), cartRoutes);
app.use("/api/order", Validator, eventHandler("info", "orderRoutesAccess"), orderRoutes);
app.use("/api/blog", Validator, eventHandler("info", "blogRoutesAccess"), blogRoutes);
app.use("/api/support", Validator, eventHandler("info", "supportRoutesAccess"), supportRoutes);
app.use("/api/notification", Validator, eventHandler("info", "notificationRoutesAccess"), notificationRoutes);
app.use("/api/marketing", Validator, eventHandler("info", "marketingRoutesAccess"), marketingRoutes);
app.use("/api/seo", Validator, eventHandler("info", "seoRoutesAccess"), seoRoutes);
app.use("/api/language", Validator, eventHandler("info", "languageRoutesAccess"), languageRoutes);
app.use("/api/faq", Validator, eventHandler("info", "faqRoutesAccess"), faqRoutes);
app.use("/api/theme", Validator, eventHandler("info", "themeRoutesAccess"), themeRoutes);
app.use("/api/return", Validator, eventHandler("info", "returnRoutesAccess"), returnRoutes);
app.use("/api/payout", Validator, eventHandler("info", "payoutRoutesAccess"), payoutRoutes);
app.use("/api/store", Validator, eventHandler("info", "storeRoutesAccess"), storeRoutes);
app.use("/api/transaction", Validator, eventHandler("info", "transactionRoutesAccess"), transactionRoutes);
app.use("/api/user", eventHandler("info", "userRouteAccess"), userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", eventHandler("info", "analyticsRoutesAccess"), analyticsRoutes);
app.use("/api/logs", eventHandler("info", "info", "logsRoutesAccess"), analyticsRoutes);
app.use("/api/filter", eventHandler("info", "info", "filterRoutesAccess"), filterRoutes);

// Custom morgan stream to handle logs
const morganMiddleware = function (req, res, next) {
  if (req.method === "POST") {
    morgan("combined", { stream: morganStream })(req, res, next);
  } else {
    next();
  }
};

const morganStream = {
  write: (message) => {
    // Call the storeLogInDB function to store the log in MongoDB
    storeLogInDB(message);
  },
};

async function storeLogInDB(logMessage) {
  try {
    // Call the API to store the log in the logs collection
    await axios.post(`${SERVER_URL}/api/logs`, { message: logMessage });
  } catch (error) {
    console.error("Error while saving log:", error);
  }
}

// Use the morganMiddleware to log HTTP requests
//app.use(morganMiddleware);

app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
