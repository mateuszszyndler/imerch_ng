import express from "express";
import languageController from "../controllers/LanguageController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", languageController.getAllLanguages);
router.get("/:languageId", languageController.getLanguage);
router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, languageController.createOrUpdateLanguage);
router.put("/:languageId", isAuthenticated, hasRole(["Admin"]), Validator, languageController.createOrUpdateLanguage);
router.delete("/:languageId", isAuthenticated, hasRole(["Admin"]), languageController.softDeleteOrRestoreLanguage);

router.get("/apply-filters", languageController.getLanguagesByField); // This is QUERY PARAMS
router.get("/status", languageController.findLanguagesByStatus);
router.get("/count", languageController.countLanguages);

export default router;
