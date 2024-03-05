import express from "express";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";
import seoController from "../controllers/SeoController.js";

const router = express.Router();

// SEO Routes
router.get("/", isAuthenticated, hasRole(["Admin"]), seoController.getAllSEO);
router.get("/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.getSEO);
router.get("/filter", isAuthenticated, hasRole(["Admin"]), seoController.applyFilters);
router.get("/status", isAuthenticated, hasRole(["Admin"]), seoController.findSEOByStatus);
router.get("/count", isAuthenticated, hasRole(["Admin"]), seoController.countSEO);
router.get("/field", isAuthenticated, hasRole(["Admin"]), seoController.getByFieldSEO);
router.get("/title", isAuthenticated, hasRole(["Admin"]), seoController.findByTitleSEO);
router.get("/keywords", isAuthenticated, hasRole(["Admin"]), seoController.findByKeywordsSEO);
router.get("/version", isAuthenticated, hasRole(["Admin"]), seoController.findByVersionSEO);
router.get("/created-at", isAuthenticated, hasRole(["Admin"]), seoController.findByCreatedAtRangeSEO);

router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, seoController.createOrUpdateSEO);
router.post("/save", isAuthenticated, hasRole(["Admin"]), Validator, seoController.saveSEO);

router.put("/:seoId", isAuthenticated, hasRole(["Admin"]), Validator, seoController.createOrUpdateSEO);
router.put("/save/:seoId", isAuthenticated, hasRole(["Admin"]), Validator, seoController.saveOrUpdateSEO);
router.put("/soft-delete-restore/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.softDeleteOrRestoreSEO);
router.put("/activate/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.activateSEO);
router.put("/deactivate/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.deactivateSEO);

router.delete("/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.deleteSEO);
router.delete("/soft-delete/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.softDeleteSEO);
router.delete("/restore/:seoId", isAuthenticated, hasRole(["Admin"]), seoController.restoreSEO);

export default router;
