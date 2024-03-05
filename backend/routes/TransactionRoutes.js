import express from "express";
import transactionController from "../controllers/TransactionController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransaction);
router.post("/", isAuthenticated, Validator, transactionController.createOrUpdateTransaction);
router.put("/:id", isAuthenticated, Validator, transactionController.createOrUpdateTransaction);
router.delete("/:id", isAuthenticated, hasRole(["Admin"]), transactionController.softDeleteOrRestoreTransaction);

// Custom Routes
router.get("/by-field", isAuthenticated, hasRole(["Admin"]), transactionController.getTransactionsByField);
router.get("/by-status", isAuthenticated, hasRole(["Admin"]), transactionController.getTransactionsByStatus);
router.get("/count", isAuthenticated, hasRole(["Admin"]), transactionController.countTransactions);
router.get("/receipt", isAuthenticated, transactionController.generateReceipt);
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), transactionController.applyFilters); // This is QUERY PARAMS

export default router;
