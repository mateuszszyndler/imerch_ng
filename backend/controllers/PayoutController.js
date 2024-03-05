import Payout from "../models/Payout.js";
import { errorHandler } from "../helpers/eventHandler.js";

const payoutController = {
  createOrUpdatePayout: async (req, res, next) => {
    try {
      const payoutData = req.body;
      const payout = await Payout.createOrUpdate(payoutData);
      res.status(200).json(payout);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deletePayout: async (req, res, next) => {
    try {
      const { payoutId } = req.params;
      const deletedPayout = await Payout.findByIdAndDelete(payoutId);
      res.status(200).json(deletedPayout);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findPayoutByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const payouts = await Payout.findPayoutsByStatus(status);
      res.status(200).json(payouts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countPayout: async (req, res, next) => {
    try {
      const count = await Payout.countPayouts();
      res.status(200).json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdatePayout: async (req, res, next) => {
    try {
      const payoutData = req.body;
      const payout = new Payout(payoutData);
      const savedPayout = await payout.saveOrUpdate();
      res.status(200).json(savedPayout);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestorePayout: async (req, res, next) => {
    try {
      const { payoutId } = req.params;
      const payout = await Payout.getById(payoutId);
      const updatedPayout = await payout.softDeleteOrRestore();
      res.status(200).json(updatedPayout);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { payoutId } = req.params;
      const payout = await Payout.getById(payoutId);
      const user = await payout.getUser();
      res.status(200).json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredPayouts = await Payout.find().applyFilters(filters);
      res.status(200).json(filteredPayouts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { payoutId } = req.params;
      const payout = await Payout.getById(payoutId);
      res.status(200).json(payout);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const payouts = await Payout.getAll();
      res.status(200).json(payouts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const payouts = await Payout.getByField(field, value);
      res.status(200).json(payouts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findPayoutsByPartnerId: async (req, res, next) => {
    try {
      const { partnerId } = req.params;
      const payouts = await Payout.findPayoutsByPartnerId(partnerId);
      res.status(200).json(payouts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default payoutController;
