import express from "express";
import blogController from "../controllers/BlogController.js";
import Validator from "../validators/Validator.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, blogController.findBlogsByStatus);
router.post("/", isAuthenticated, hasRole(["Admin"]), Validator, blogController.createOrUpdateBlog);
router.put("/:id", isAuthenticated, hasRole(["Admin"]), Validator, blogController.createOrUpdateBlog);
router.delete("/:id", isAuthenticated, hasRole(["Admin"]), blogController.deleteBlog);
router.get("/:id", isAuthenticated, blogController.getBlog);
router.get("/search", isAuthenticated, blogController.getByField);
router.get("/count", isAuthenticated, blogController.countBlogs);

export default router;
