// filter.routes.js
import express from "express";
import filterController from "../controllers/FilterController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.post("/filter", Validator, (req, res) => {
  // Callback function logic here
  filterController.filterProducts(req, res);
});

export default router;
