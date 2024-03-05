import express from "express";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/count", userController.countUsers);
router.get("/:id", userController.getUser);
router.get("/pending-orders/:id", isAuthenticated, userController.getPendingOrders);
router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, userController.createOrUpdateUser);
router.put("/:id", isAuthenticated, hasRole(["Admin"]), Validator, userController.createOrUpdateUser);
router.delete("/:id", isAuthenticated, hasRole(["Admin"]), userController.deleteUser);
router.patch("/activate/:id", isAuthenticated, hasRole(["Admin"]), userController.activateUser);
router.patch("/deactivate/:id", isAuthenticated, hasRole(["Admin"]), userController.deactivateUser);
router.patch("/restore/:id", isAuthenticated, hasRole(["Admin"]), userController.restoreUser);
router.patch("/calculate-rating/:id", isAuthenticated, hasRole(["Admin"]), userController.calculateUserRating);
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), userController.applyFilters); // This is QUERY PARAMS
router.get("/by-field", isAuthenticated, hasRole(["Admin"]), userController.getUserByField);
router.patch("/save-or-update/:id", isAuthenticated, hasRole(["Admin"]), userController.saveOrUpdateUser);
router.patch("/soft-delete-or-restore/:id", isAuthenticated, hasRole(["Admin"]), userController.softDeleteOrRestore);

export default router;
