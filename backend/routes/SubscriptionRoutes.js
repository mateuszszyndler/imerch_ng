import express from "express";
import subscriptionController from "../controllers/SubscriptionController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", subscriptionController.getAllSubscriptions);
router.get("/:id", isAuthenticated, subscriptionController.getSubscription);
router.post("/", isAuthenticated, hasRole(["Admin", "Partner"]), Validator, subscriptionController.createOrUpdateSubscription);
router.put("/:id", isAuthenticated, hasRole(["Admin", "Partner"]), Validator, subscriptionController.createOrUpdateSubscription);
router.delete("/:id", isAuthenticated, hasRole(["Admin", "Partner"]), subscriptionController.deleteSubscription);

router.get("/status", isAuthenticated, subscriptionController.findSubscriptionsByStatus);
router.get("/count", isAuthenticated, hasRole(["Admin"]), subscriptionController.countSubscriptions);
router.get("/field/:field/:value", isAuthenticated, subscriptionController.getByField);
router.get("/apply-filters", isAuthenticated, subscriptionController.applyFilters); // This is QUERY param

router.put("/softDeleteOrRestore/:id", isAuthenticated, hasRole(["Admin"]), subscriptionController.softDeleteOrRestoreSubscription);

export default router;
