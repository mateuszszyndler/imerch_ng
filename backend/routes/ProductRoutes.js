import express from "express";
import productController from "../controllers/ProductController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, productController.createOrUpdateProduct);
router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), Validator, productController.applyFilters); // This is QUERY PARAMS
router.get("/status/:status", isAuthenticated, hasRole(["Admin"]), productController.findProductsByStatus);
router.get("/field", isAuthenticated, hasRole(["Admin"]), Validator, productController.getProductsByField);
router.get("/count", isAuthenticated, hasRole(["Admin"]), productController.countProducts);
router.get("/best", productController.getBestProducts);
router.get("/latest", productController.getLatestProducts);
router.get("/:id/reviews", productController.getProductReviews);
router.get("/:id", productController.getProduct);
router.get("/store/:id", productController.getProductsByStoreId);
router.put("/:id", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, productController.createOrUpdateProduct);
router.delete("/:id", isAuthenticated, hasRole(["Partner", "Admin"]), productController.softDeleteOrRestoreProduct);

export default router;
