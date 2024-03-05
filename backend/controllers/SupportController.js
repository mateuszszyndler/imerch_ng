import Support from "../models/Support.js";
import { errorHandler } from "../helpers/eventHandler.js";

const supportController = {
  createOrUpdateSupport: async (req, res, next) => {
    try {
      const supportData = req.body;
      const support = await Support.createOrUpdate(supportData);
      res.json(support);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteSupport: async (req, res, next) => {
    try {
      const supportId = req.params.id;
      const deletedSupport = await Support.deleteSupportRequest(supportId);
      res.json(deletedSupport);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findSupportByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const supportRequests = await Support.findSupportRequestsByStatus(status);
      res.json(supportRequests);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countSupport: async (req, res, next) => {
    try {
      const count = await Support.countSupportRequests();
      res.json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdate: async (req, res, next) => {
    try {
      const supportData = req.body;
      const support = new Support(supportData);
      const savedSupport = await support.saveSupportRequest();
      res.json(savedSupport);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestore: async (req, res, next) => {
    try {
      const supportId = req.params.id;
      const updatedSupport = await Support.softDeleteOrRestore(supportId);
      res.json(updatedSupport);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const supportRequests = await Support.findByUser(userId);
      res.json(supportRequests);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredRequests = await Support.find().applyFilters(filters);
      res.status(200).json(filteredRequests);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const supportId = req.params.id;
      const support = await Support.getById(supportId);
      res.json(support);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const supportRequests = await Support.getAll();
      res.json(supportRequests);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const field = req.query.field;
      const value = req.query.value;
      const supportRequests = await Support.getByField(field, value);
      res.json(supportRequests);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default supportController;
