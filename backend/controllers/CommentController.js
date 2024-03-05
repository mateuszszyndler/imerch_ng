import Comment from "../models/Comment.js";
import { errorHandler } from "../helpers/eventHandler.js";

const commentController = {
  createOrUpdateComment: async (req, res, next) => {
    try {
      const commentData = req.body;
      const comment = await Comment.createOrUpdate(commentData);
      res.status(201).json(comment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const deletedComment = await Comment.findByIdAndRemove(commentId);
      res.status(200).json(deletedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findCommentsByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const comments = await Comment.findCommentsByStatus(status);
      res.status(200).json(comments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countComments: async (req, res, next) => {
    try {
      const count = await Comment.countComments();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateComment: async (req, res, next) => {
    try {
      const commentData = req.body;
      const comment = new Comment(commentData);
      const savedComment = await comment.saveOrUpdate();
      res.status(201).json(savedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreComment: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.softDeleteOrRestore();
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const user = await comment.getUser();
      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredComments = await Comment.find().applyFilters(filters);
      res.status(200).json(filteredComments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.getById(commentId);
      res.status(200).json(comment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getTopRated: async (req, res, next) => {
    try {
      const comments = await Comment.getTopRated();
      res.status(200).json(comments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const comments = await Comment.getAll();
      res.status(200).json(comments);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  addLike: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.addLike();
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  removeLike: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.removeLike();
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  addShare: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.addShare();
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  removeShare: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.removeShare();
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  addHistory: async (req, res, next) => {
    try {
      const { action, content, precontent } = req.body;
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const updatedComment = await comment.addHistory(action, content, precontent);
      res.status(200).json(updatedComment);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getHistory: async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findById(commentId);
      const history = comment.getHistory();
      res.status(200).json(history);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default commentController;
