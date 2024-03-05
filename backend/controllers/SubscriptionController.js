import Subscription from "../models/Subscription.js";
import { errorHandler } from "../helpers/eventHandler.js";

const subscriptionController = {
  createOrUpdateSubscription: async (req, res, next) => {
    try {
      const subscriptionData = req.body;
      const subscription = await Subscription.createOrUpdate(subscriptionData);
      res.status(200).json(subscription);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteSubscription: async (req, res, next) => {
    try {
      const subscriptionId = req.params.id;
      const subscription = await Subscription.findByIdAndDelete(subscriptionId);
      res.status(200).json(subscription);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findSubscriptionsByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      let subscriptions;
      if (status === "active") {
        subscriptions = await Subscription.findActiveByStatus();
      } else if (status === "deleted") {
        subscriptions = await Subscription.findDeletedByStatus();
      } else {
        subscriptions = [];
      }
      res.status(200).json(subscriptions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countSubscriptions: async (req, res, next) => {
    try {
      const count = await Subscription.countDocuments();
      res.status(200).json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateSubscription: async (req, res, next) => {
    try {
      const subscriptionData = req.body;
      const subscription = new Subscription(subscriptionData);
      await subscription.saveOrUpdate();
      res.status(200).json(subscription);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreSubscription: async (req, res, next) => {
    try {
      const subscriptionId = req.params.id;
      const subscription = await Subscription.findById(subscriptionId);
      if (subscription) {
        await subscription.softDeleteOrRestore();
        res.status(200).json(subscription);
      } else {
        res.status(404).json({ message: "Subscription not found" });
      }
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getSubscription: async (req, res, next) => {
    try {
      const subscriptionId = req.params.id;
      const subscription = await Subscription.getById(subscriptionId);
      res.status(200).json(subscription);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllSubscriptions: async (req, res, next) => {
    try {
      const subscriptions = await Subscription.getAll();
      res.status(200).json(subscriptions);
    } catch (error) {
      //errorHandler(error, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const { field, value } = req.params;
      const subscriptions = await Subscription.getByField(field, value);
      res.status(200).json(subscriptions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredSubscriptions = await Subscription.find().applyFilters(filters);
      res.status(200).json(filteredSubscriptions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default subscriptionController;
