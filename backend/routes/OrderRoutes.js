import express from "express";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";
import orderController from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.getAllOrders);
router.get("/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.getOrderById);
router.post("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, orderController.createOrUpdateOrder);
router.put("/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, orderController.createOrUpdateOrder);
router.delete("/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.deleteOrder);
router.put("/restore/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.softDeleteOrRestoreOrder);
router.get("/status/:status", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.findOrdersByStatus);
router.get("/count", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.countOrders);
router.get("/user/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.getUser);
router.get("/apply-filters", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), orderController.applyFilters);
router.get("/field", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, orderController.getOrdersByField);
router.get("/document/:id", isAuthenticated, orderController.generateInvoiceDocument);

export default router;
