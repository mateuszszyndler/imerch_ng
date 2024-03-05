import ReturnPolicy from "../models/Return.js";
import { errorHandler } from "../helpers/eventHandler.js";

const returnController = {
  createOrUpdate: async (req, res, next) => {
    try {
      const returnPolicyData = req.body;
      const returnPolicy = await ReturnPolicy.createOrUpdate(returnPolicyData);
      res.json(returnPolicy);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  delete: async (req, res, next) => {
    try {
      const returnPolicyId = req.params.id;
      const returnPolicy = await ReturnPolicy.findByIdAndDelete(returnPolicyId);
      res.json(returnPolicy);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findReturnPolicyByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const returnPolicies = await ReturnPolicy.findReturnPoliciesByStatus(status);
      res.json(returnPolicies);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countReturnPolicies: async (req, res, next) => {
    try {
      const count = await ReturnPolicy.countReturnPolicies();
      res.json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdate: async (req, res, next) => {
    try {
      const returnPolicy = new ReturnPolicy(req.body);
      await returnPolicy.saveOrUpdate();
      res.json(returnPolicy);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestore: async (req, res, next) => {
    try {
      const returnPolicyId = req.params.id;
      const returnPolicy = await ReturnPolicy.getById(returnPolicyId);
      await returnPolicy.softDeleteOrRestore();
      res.json(returnPolicy);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await ReturnPolicy.getByField("user", userId);
      res.json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const returnPolicyId = req.params.id;
      const returnPolicy = await ReturnPolicy.getById(returnPolicyId);
      res.json(returnPolicy);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const returnPolicies = await ReturnPolicy.getAll();
      res.json(returnPolicies);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const returnPolicies = await ReturnPolicy.getByField(field, value);
      res.json(returnPolicies);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredPolicies = await ReturnPolicy.find().applyFilters(filters);
      res.status(200).json(filteredPolicies);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default returnController;
