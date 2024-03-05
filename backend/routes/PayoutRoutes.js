import express from "express";
import payoutController from "../controllers/PayoutController.js";
import Validator from "../validators/Validator.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", payoutController.getAll);
router.get("/:payoutId", isAuthenticated, payoutController.getById);
router.get("/partner/:partnerId", isAuthenticated, hasRole(["Partner", "Admin"]), payoutController.findPayoutsByPartnerId);
router.get("/status", isAuthenticated, payoutController.findPayoutByStatus);
router.get("/count", isAuthenticated, payoutController.countPayout);

router.post("/", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, payoutController.createOrUpdatePayout);
router.post("/filter", isAuthenticated, Validator, payoutController.applyFilters);

router.put("/:payoutId", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, payoutController.createOrUpdatePayout);
router.put("/restore/:payoutId", isAuthenticated, hasRole(["Partner", "Admin"]), payoutController.softDeleteOrRestorePayout);

router.delete("/:payoutId", isAuthenticated, hasRole(["Partner", "Admin"]), payoutController.deletePayout);

export default router;
