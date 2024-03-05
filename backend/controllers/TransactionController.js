import Transaction from "../models/Transaction.js";
import { errorHandler } from "../helpers/eventHandler.js";

const transactionController = {
  createOrUpdateTransaction: async (req, res, next) => {
    try {
      const transactionData = req.body;
      const transaction = await Transaction.createOrUpdate(transactionData);
      res.status(200).json(transaction);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getTransaction: async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const transaction = await Transaction.getById(transactionId);
      res.status(200).json(transaction);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllTransactions: async (req, res, next) => {
    try {
      const transactions = await Transaction.getAll();
      res.status(200).json(transactions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getTransactionsByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const transactions = await Transaction.getByField(field, value);
      res.status(200).json(transactions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getTransactionsByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const transactions = await Support.findTransactionsByStatus(status);
      res.json(transactions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countTransactions: async (req, res, next) => {
    try {
      const count = await Transaction.countTransactions();
      res.status(200).json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.getById(id);
      await transaction.softDeleteOrRestore();
      res.status(200).json(transaction);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredTransactions = await Transaction.find().applyFilters(filters);
      res.status(200).json(filteredTransactions);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  generateReceipt: async (req, res, next) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.getById(id);
      const receipt = transaction.generateReceipt();
      res.status(200).json({ receipt });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default transactionController;
