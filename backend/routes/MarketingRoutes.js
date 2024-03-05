// filename: MarketingRoutes.js

import express from "express";
import marketingController from "../controllers/MarketingController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, marketingController.createOrUpdate);
router.delete("/:id", isAuthenticated, hasRole(["Admin"]), marketingController.deleteMarketing);
router.get("/", isAuthenticated, hasRole(["Admin"]), marketingController.findMarketingByStatus);
router.get("/count", isAuthenticated, hasRole(["Admin"]), marketingController.countMarketing);
router.post("/save", isAuthenticated, hasRole(["Admin"]), Validator, marketingController.saveOrUpdate);
router.put("/soft-delete-restore/:id", isAuthenticated, hasRole(["Admin"]), marketingController.softDeleteOrRestore);
router.get("/:id", isAuthenticated, hasRole(["Admin"]), marketingController.getById);
router.get("/", isAuthenticated, hasRole(["Admin"]), marketingController.getAll);
router.get("/field", isAuthenticated, hasRole(["Admin"]), marketingController.getByField);
router.get("/user", isAuthenticated, hasRole(["Admin"]), marketingController.getUser);
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), marketingController.applyFilters);

export default router;
