import express from "express";
import faqController from "../controllers/FaqController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", faqController.getAllFAQs);
router.get("/:id", faqController.getFAQ);
router.get("/status/:status", faqController.findFAQByStatus);

router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, faqController.createOrUpdateFAQ);

router.put("/:id", isAuthenticated, hasRole(["Admin"]), Validator, faqController.createOrUpdateFAQ);

router.delete("/:id", isAuthenticated, hasRole(["Admin"]), faqController.deleteFAQ);
router.put("/soft-delete-restore/:id", isAuthenticated, hasRole(["Admin"]), faqController.softDeleteOrRestoreFAQ);
router.get("/count", faqController.countFAQs);

router.get("/apply-filters", faqController.applyFilters); // This is QUERY PARAMS

export default router;
