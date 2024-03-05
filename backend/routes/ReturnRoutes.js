import express from "express";
import returnController from "../controllers/ReturnController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

// Create or update a return policy
router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, returnController.createOrUpdate);

// Delete a return policy
router.delete("/:id", isAuthenticated, hasRole(["Admin"]), returnController.delete);

// Get return policies by status
router.get("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), returnController.findReturnPolicyByStatus);

// Count return policies
router.get("/count", isAuthenticated, hasRole(["Admin"]), returnController.countReturnPolicies);

// Save or update a return policy
router.put("/:id", isAuthenticated, hasRole(["Admin"]), Validator, returnController.saveOrUpdate);

// Soft delete or restore a return policy
router.put("/softDeleteOrRestore/:id", isAuthenticated, hasRole(["Admin"]), returnController.softDeleteOrRestore);

// Get return policy by ID
router.get("/getById/:id", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), returnController.getById);

// Get all return policies
router.get("/getAll", isAuthenticated, hasRole(["Admin"]), returnController.getAll);

// Get return policies by field
router.get("/getByField", isAuthenticated, hasRole(["Admin"]), returnController.getByField);

// Apply filters to return policies
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), returnController.applyFilters); // This is QUERY PARAMS

export default router;
