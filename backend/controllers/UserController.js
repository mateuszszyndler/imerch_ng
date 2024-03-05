import User from "../models/User.js";
import { errorHandler } from "../helpers/eventHandler.js";

const userController = {
  createOrUpdateUser: async (req, res, next) => {
    try {
      const userData = req.body;
      const user = await User.createOrUpdate(userData);
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndRemove(id);
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findUserByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const users = await User.findUserByStatus(status);
      res.json(users);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countUsers: async (req, res, next) => {
    try {
      const count = await User.countUsers();
      res.json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateUser: async (req, res, next) => {
    try {
      const user = req.body;
      await user.saveOrUpdate();
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestore: async (req, res, next) => {
    try {
      const user = req.body;
      await user.softDeleteOrRestore();
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.body;
      const filteredUsers = await User.find().applyFilters(filters);
      res.status(200).json(filteredUsers);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUserByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const users = await User.getByField(field, value);
      res.json(users);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  activateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      user.activate();
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deactivateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      user.deactivate();
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  restoreUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.restoreUser(id);
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  calculateUserRating: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      await user.calculateUserRating();
      res.json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getPendingOrders: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      const pendingOrders = await user.getPendingOrders();
      res.json(pendingOrders);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default userController;
