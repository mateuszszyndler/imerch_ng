// filename: MarketingController.js

import Marketing from "../models/Marketing.js";
import { errorHandler } from "../helpers/eventHandler.js";

const marketingController = {
  createOrUpdate: async (req, res, next) => {
    try {
      const marketingData = req.body;
      const result = await Marketing.createOrUpdate(marketingData);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteMarketing: async (req, res, next) => {
    try {
      const marketingId = req.params.id;
      const result = await Marketing.findByIdAndRemove(marketingId);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findMarketingByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const result = await Marketing.findMarketingByStatus(status);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countMarketing: async (req, res, next) => {
    try {
      const count = await Marketing.countMarketing();
      res.json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdate: async (req, res, next) => {
    try {
      const marketingData = req.body;
      const marketing = new Marketing(marketingData);
      const result = await marketing.saveOrUpdate();
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestore: async (req, res, next) => {
    try {
      const marketingId = req.params.id;
      const marketing = await Marketing.getById(marketingId);
      const result = await marketing.softDeleteOrRestore();
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const marketingId = req.params.id;
      const result = await Marketing.getById(marketingId);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const result = await Marketing.getAll();
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const result = await Marketing.getByField(field, value);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const result = await Marketing.getByField("user_id", userId);
      res.json(result);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredMarketing = await Marketing.find().applyFilters(filters);
      res.status(200).json(filteredMarketing);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default marketingController;
