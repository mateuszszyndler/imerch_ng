import Payment from "../models/Payment.js";
import { errorHandler } from "../helpers/eventHandler.js";

const paymentController = {
  createPayment: async (req, res, next) => {
    try {
      const paymentData = req.body;
      const payment = await Payment.createPayment(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getPayment: async (req, res, next) => {
    try {
      const paymentId = req.params.paymentId;
      const payment = await Payment.getPayment(paymentId);
      res.json(payment);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  updatePayment: async (req, res, next) => {
    try {
      const paymentId = req.params.paymentId;
      const updatedData = req.body;
      const updatedPayment = await Payment.updatePayment(paymentId, updatedData);
      res.json(updatedPayment);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deletePayment: async (req, res, next) => {
    try {
      const paymentId = req.params.paymentId;
      await Payment.deletePayment(paymentId);
      res.sendStatus(204);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  restorePayment: async (req, res, next) => {
    try {
      const paymentId = req.params.paymentId;
      const restoredPayment = await Payment.restorePayment(paymentId);
      res.json(restoredPayment);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredPayments = await Payment.find().applyFilters(filters);
      res.status(200).json(filteredPayments);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllPayments: async (req, res, next) => {
    try {
      const payments = await Payment.getAll();
      res.json(payments);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findPaymentsByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const payments = await Payment.findPaymentsByStatus(status);
      res.json(payments);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countPayments: async (req, res, next) => {
    try {
      const count = await Payment.countPayments();
      res.json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getPaymentsByField: async (req, res, next) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      const payments = await Payment.getByField(field, value);
      res.json(payments);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default paymentController;
