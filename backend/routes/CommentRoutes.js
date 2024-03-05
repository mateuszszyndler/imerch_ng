import express from "express";
import commentController from "../controllers/CommentController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", hasRole(["Client", "Partner", "Admin"]), commentController.getAll);

router.get("/top", commentController.getTopRated);

router.get("/:id", hasRole(["Client", "Partner", "Admin"]), commentController.getById);

router.get("/apply-filters", hasRole(["Client", "Partner", "Admin"]), commentController.applyFilters);

router.post("/", hasRole(["Client", "Partner", "Admin"]), commentController.createOrUpdateComment);

router.put("/:id", hasRole(["Client", "Partner", "Admin"]), commentController.createOrUpdateComment);

router.delete("/:id", hasRole(["Client", "Partner", "Admin"]), commentController.deleteComment);

router.post("/restore/:id", hasRole(["Client", "Partner", "Admin"]), commentController.softDeleteOrRestoreComment);

router.get("/user/:id", hasRole(["Client", "Partner", "Admin"]), commentController.getUser);

router.post("/:id/like", isAuthenticated, commentController.addLike);

router.delete("/:id/like", isAuthenticated, commentController.removeLike);

router.post("/:id/share", isAuthenticated, commentController.addShare);

router.delete("/:id/share", isAuthenticated, commentController.removeShare);

router.post("/:id/history", hasRole(["Client", "Partner", "Admin"]), commentController.addHistory);

router.get("/:id/history", hasRole(["Client", "Partner", "Admin"]), commentController.getHistory);

export default router;
