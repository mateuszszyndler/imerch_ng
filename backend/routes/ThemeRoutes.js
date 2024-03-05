import express from "express";
import themeController from "../controllers/ThemeController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

// Create or update theme


// Delete theme
router.delete("/:themeId", themeController.deleteTheme);

router.post("/", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, themeController.createOrUpdateTheme);

// Find themes by status
router.get("/", isAuthenticated, hasRole(["Partner", "Admin"]), themeController.findThemesByStatus);

// Count themes
router.get("/count", isAuthenticated, hasRole(["Partner", "Admin"]), themeController.countThemes);

// Save or update theme
router.put("/", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, themeController.saveOrUpdateTheme);

// Soft delete or restore theme
router.put("/softdeleteorrestore/:themeId", isAuthenticated, hasRole(["Partner", "Admin"]), themeController.softDeleteOrRestoreTheme);

// Get theme by ID
router.get("/:themeId",  themeController.getTheme);

// Get all themes
router.get("/all", isAuthenticated, hasRole(["Partner", "Admin"]), themeController.getAllThemes);

// Get themes by field
router.get("/:field/:value", isAuthenticated, hasRole(["Partner", "Admin"]), themeController.getByField);

// Apply filters to themes
router.get("/apply-filters", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, themeController.applyFilters); // This is QUERY PARAMS

export default router;
