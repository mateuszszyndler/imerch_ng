import express from "express";
import { hasRole, isAuthenticated } from "../middleware/authMiddleware.js";
import predefinedProductController from "../controllers/PredefinedController.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", predefinedProductController.getAll);
router.get("/count", predefinedProductController.countPredefinedProducts);
router.get("/:id", predefinedProductController.getById);
router.get("/apply-filters", predefinedProductController.applyFilters); // This is QUERY PARAMS

router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, predefinedProductController.createOrUpdatePredefinedProduct);

router.put("/:id", isAuthenticated, hasRole(["Admin"]), Validator, predefinedProductController.createOrUpdatePredefinedProduct);

router.delete("/:id", isAuthenticated, hasRole(["Admin"]), predefinedProductController.deletePredefinedProduct);

router.put("/soft-delete-restore/:id", isAuthenticated, hasRole(["Admin"]), predefinedProductController.softDeleteOrRestorePredefinedProduct);

router.get("/status/:status", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), predefinedProductController.findPredefinedProductsByStatus);

export default router;
