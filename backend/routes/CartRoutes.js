import express from "express";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";
import cartController from "../controllers/CartController.js";

const router = express.Router();

// Create or update a cart
router.post("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, cartController.createOrUpdateCart);

// Delete a cart
router.delete("/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.deleteCart);

// Get carts by status
router.get("/status", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.findCartByStatus);

// Count all carts
router.get("/count", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.countCarts);

// Save or update a cart
router.post("/saveOrUpdate", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, cartController.saveOrUpdate);

// Soft delete or restore a cart
router.post("/softDeleteOrRestore/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.softDeleteOrRestore);

// Get user's carts
router.get("/user/:userId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.getUser);

// Apply filters to carts
router.get("/apply-filters", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, cartController.applyFilters); // This is QUERY PARAMS

// Get cart by ID
router.get("/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.getById);

// Get all carts
router.get("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.getAll);

// Get carts by field
router.get("/getByField", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.getByField);

// Add an item to a cart
router.post("/addItem/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, cartController.addItem);

// Remove an item from a cart
router.delete("/removeItem/:cartId/:itemId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.removeItem);

// Update an item in a cart
router.put("/updateItem/:cartId/:itemId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.updateItem);

// Apply a discount to a cart
router.post("/applyDiscount/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, cartController.applyDiscount);

// Remove a discount from a cart
router.delete("/removeDiscount/:cartId/:discountId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.removeDiscount);

// Calculate the total for a cart
router.post("/calculateTotal/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.calculateTotal);

// Mark a cart as empty
router.post("/markAsEmpty/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.markAsEmpty);

// Set the shipping address for a cart
router.post("/setShippingAddress/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.setShippingAddress);

// Set the billing address for a cart
router.post("/setBillingAddress/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.setBillingAddress);

// Set the billing address same as shipping address for a cart
router.post("/setBillingSameAsShipping/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.setBillingSameAsShipping);

// Set the payment method for a cart
router.post("/setPaymentMethod/:cartId", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), cartController.setPaymentMethod);

export default router;
