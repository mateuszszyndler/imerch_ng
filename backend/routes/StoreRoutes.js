import express from "express";
import storeController from "../controllers/StoreController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";

const router = express.Router();

router.get("/top-stores", storeController.getTopStores);

router.get("/", storeController.getAllStores);

router.get("/field", storeController.getStoresByField);

router.get("/:storeId", storeController.getStore);

router.post("/", isAuthenticated, hasRole(["Client", "Partner", "Admin"]), Validator, storeController.createOrUpdateStore);

router.put("/:storeId", isAuthenticated, hasRole(["Partner", "Admin"]), Validator, storeController.createOrUpdateStore);

router.delete("/:storeId", isAuthenticated, hasRole(["Partner", "Admin"]), storeController.deleteStore);

router.put("/status/:storeId", isAuthenticated, hasRole(["Partner", "Admin"]), storeController.softDeleteOrRestoreStore);

router.get("/status/:status", isAuthenticated, hasRole(["Admin"]), storeController.findStoresByStatus);

router.get("/count", isAuthenticated, hasRole(["Admin"]), storeController.countStores);

router.get("/apply-filters", isAuthenticated, hasRole(["Admin"]), storeController.applyFilters); // This is QUERY PARAMS

export default router;
