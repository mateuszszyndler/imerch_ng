import express from "express";
import paymentController from "../controllers/PaymentController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), paymentController.getAllPayments);
router.get("/:paymentId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), paymentController.getPayment);
router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, paymentController.createPayment);
router.put("/:paymentId", isAuthenticated, hasRole(["Admin"]), Validator, paymentController.updatePayment);
router.delete("/:paymentId", isAuthenticated, hasRole(["Admin"]), paymentController.deletePayment);
router.get("/status", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), paymentController.findPaymentsByStatus);
router.get("/count", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), paymentController.countPayments);
router.put("/soft-delete/:paymentId", isAuthenticated, hasRole(["Admin"]), paymentController.deletePayment);
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), paymentController.applyFilters);
router.get("/byField/:field/:value", isAuthenticated, hasRole(["Admin"]), paymentController.getPaymentsByField);

export default router;
