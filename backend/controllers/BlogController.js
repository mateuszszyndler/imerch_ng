import Blog from "../models/Blog.js";
import { errorHandler } from "../helpers/eventHandler.js";

const blogController = {
  createOrUpdateBlog: async (req, res, next) => {
    try {
      const blogData = req.body;
      const result = await Blog.createOrUpdate(blogData);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteBlog: async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const result = await Blog.deleteBlog(blogId);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findBlogsByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const result = await Blog.findBlogsByStatus(status);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countBlogs: async (req, res, next) => {
    try {
      const count = await Blog.countBlogs();
      res.json({ count });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateBlog: async (req, res, next) => {
    try {
      const blogData = req.body;
      const blog = new Blog(blogData);
      const result = await blog.saveOrUpdate();
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreBlog: async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const result = await Blog.softDeleteOrRestore(blogId);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getBlog: async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const result = await Blog.getById(blogId);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const field = req.query.field;
      const value = req.query.value;
      const result = await Blog.getByField(field, value);
      res.json(result);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // Additional methods

  getUser: async (req, res, next) => {
    try {
      // Implementation for retrieving the user associated with the blog
      const blogId = req.params.id;
      const blog = await Blog.getById(blogId);
      // Assuming there is a user associated with the blog, retrieve the user
      const userId = blog.user_id; // Assuming the user_id is stored in the blog document
      const user = await User.findById(userId); // Assuming the User model exists
      res.json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default blogController;
