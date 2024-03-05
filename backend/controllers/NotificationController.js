import Notification from "../models/Notification.js";
import { errorHandler } from "../helpers/eventHandler.js";

const notificationController = {
  createOrUpdateNotification: async (req, res, next) => {
    try {
      const notificationData = req.body;
      const notification = await Notification.createOrUpdate(notificationData);
      res.json(notification);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteNotification: async (req, res, next) => {
    try {
      const notificationId = req.params.notificationId;
      const deletedNotification = await Notification.deleteNotification(notificationId);
      res.json(deletedNotification);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findNotificationsByStatus: async (req, res, next) => {
    try {
      const status = req.params.status;
      const notifications = await Notification.findNotificationsByStatus(status);
      res.json(notifications);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countNotifications: async (req, res, next) => {
    try {
      const count = await Notification.countNotifications();
      res.json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateNotification: async (req, res, next) => {
    try {
      const notification = req.body;
      const savedNotification = await notification.saveOrUpdate();
      res.json(savedNotification);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestore: async (req, res, next) => {
    try {
      const notificationId = req.params.notificationId;
      const updatedNotification = await Notification.softDeleteOrRestore(notificationId);
      res.json(updatedNotification);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const userNotifications = await Notification.findByUser(userId);
      res.json(userNotifications);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredNotifications = await Notification.find().applyFilters(filters);
      res.status(200).json(filteredNotifications);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default notificationController;
