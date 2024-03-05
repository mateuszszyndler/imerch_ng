import express from "express";
import supportController from "../controllers/SupportController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/", isAuthenticated, supportController.getAll);
router.get("/:id", isAuthenticated, supportController.getById);
router.get("/status", isAuthenticated, supportController.findSupportByStatus);
router.get("/field", isAuthenticated, supportController.getByField);

router.post("/", isAuthenticated, Validator, supportController.createOrUpdateSupport);

router.put("/:id", isAuthenticated, Validator, supportController.createOrUpdateSupport);

router.delete("/:id", isAuthenticated, supportController.deleteSupport);

router.get("/apply-filters", isAuthenticated, supportController.applyFilters);

router.post("/count", isAuthenticated, supportController.countSupport);

router.put("/soft-delete/:id", isAuthenticated, hasRole(["Admin"]), supportController.softDeleteOrRestore);
router.put("/restore/:id", isAuthenticated, hasRole(["Admin"]), supportController.softDeleteOrRestore);

router.get("/user/:id", isAuthenticated, supportController.getUser);

export default router;
