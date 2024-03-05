import express from "express";
import designController from "../controllers/DesignController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", designController.getAllDesigns);
router.get("/:id", designController.getDesignById);
router.get("/field/:field/:value", designController.getDesignsByField);
router.get("/status/:status", designController.findDesignByStatus);
router.get("/partner/:id", designController.getPartnerForDesign);
router.get("/product/:id", designController.getProductForDesign);
router.get("/predefined-product/:id", designController.getPredefinedProductForDesign);
router.get("/print-area/:id", designController.getPrintAreaForDesign);

router.post("/", hasRole(["Partner", "Admin"]), Validator, designController.createOrUpdateDesign);
router.get("/apply-filters", hasRole(["Partner", "Admin"]), designController.applyFilters); // This is QUERY PARAM
router.post("/count", hasRole(["Partner", "Admin"]), designController.countDesigns);
router.post("/save", hasRole(["Partner", "Admin"]), Validator, designController.saveDesign);

router.put("/:id", hasRole(["Partner", "Admin"]), Validator, designController.createOrUpdateDesign);
router.put("/soft-delete/:id", hasRole(["Partner", "Admin"]), designController.softDeleteDesign);
router.put("/restore/:id", hasRole(["Partner", "Admin"]), designController.restoreDesign);
router.put("/activate/:id", hasRole(["Partner", "Admin"]), designController.activateDesign);
router.put("/deactivate/:id", hasRole(["Partner", "Admin"]), designController.deactivateDesign);

router.delete("/:id", hasRole(["Partner", "Admin"]), designController.deleteDesign);

export default router;
