import express from "express";
import notificationController from "../controllers/NotificationController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", isAuthenticated, notificationController.findNotificationsByStatus);
router.post("/", isAuthenticated, Validator, notificationController.createOrUpdateNotification);
router.put("/:notificationId", isAuthenticated, Validator, notificationController.createOrUpdateNotification);
router.delete("/:notificationId", isAuthenticated, notificationController.deleteNotification);

//router.post("/bulk-create", isAuthenticated, hasRole(["Admin"]), Validator, notificationController.createAllNotifications);
//router.put("/bulk-update", isAuthenticated, hasRole(["Admin"]), Validator, notificationController.updateAllNotifications);
//router.delete("/bulk-delete", isAuthenticated, hasRole(["Admin"]), notificationController.deleteAllNotifications);

router.get("/count", isAuthenticated, notificationController.countNotifications);
router.get("/user/:userId", isAuthenticated, notificationController.getUser);
router.get("/apply-filters", isAuthenticated, notificationController.applyFilters);

export default router;
