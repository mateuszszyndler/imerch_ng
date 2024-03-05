import express from "express";
import shippingController from "../controllers/ShippingController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", isAuthenticated, shippingController.getAllShippings);

router.get("/:Id", isAuthenticated, shippingController.getShippingById);

router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, shippingController.saveOrUpdateShipping);

router.put("/:Id", isAuthenticated, hasRole(["Admin"]), Validator, shippingController.saveOrUpdateShipping);

router.delete("/:Id", isAuthenticated, hasRole(["Admin"]), shippingController.deleteShipping);

router.put("/soft-delete-restore/:Id", isAuthenticated, hasRole(["Admin"]), shippingController.softDeleteOrRestoreShipping);

router.put("/activate/:Id", isAuthenticated, hasRole(["Admin"]), shippingController.activateShipping);

router.put("/deactivate/:Id", isAuthenticated, hasRole(["Admin"]), shippingController.deactivateShipping);

router.put("/restore/:Id", isAuthenticated, hasRole(["Admin"]), shippingController.restoreShipping);

router.get("/count", isAuthenticated, shippingController.countShippings);

router.get("/active", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), shippingController.findShippingByStatus);

router.get("/apply-filters", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), shippingController.applyFilters);

export default router;
