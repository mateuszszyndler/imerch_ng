import Order from "../models/Order.js";
import { errorHandler } from "../helpers/eventHandler.js";

const orderController = {
  createOrUpdateOrder: async (req, res, next) => {
    try {
      const orderData = req.body;
      const order = await Order.createOrUpdate(orderData);
      res.status(201).json(order);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      await Order.deleteOrder(orderId);
      res.sendStatus(204);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findOrdersByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const orders = await Order.findOrdersByStatus(status);
      res.status(200).json(orders);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countOrders: async (req, res, next) => {
    try {
      const count = await Order.countOrders();
      res.status(200).json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateOrder: async (req, res, next) => {
    try {
      const orderData = req.body;
      const order = await new Order(orderData).saveOrUpdate();
      res.status(201).json(order);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.getById(orderId);
      await order.softDeleteOrRestore();
      res.status(200).json(order);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.getById(orderId);
      const user = await User.getById(order.user_id);
      res.status(200).json(user);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredOrders = await Order.find().applyFilters(filters);
      res.status(200).json(filteredOrders);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.getById(orderId);
      res.status(200).json(order);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllOrders: async (req, res, next) => {
    try {
      const orders = await Order.getAll();
      res.status(200).json(orders);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  generateInvoiceDocument: async (req, res) => {
    try {
      const invoiceId = req.params.id;
      const order = await Order.findById(invoiceId);
      const document = await order.generateInvoiceDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="invoice_${invoiceId}.pdf"`);
      document.pipe(res);
    } catch (err) {
      errorHandler(err, req, res);
    }
  },

  getOrdersByField: async (req, res, next) => {
    try {
      const field = req.query.field;
      const value = req.query.value;
      const orders = await Order.getByField(field, value);
      res.status(200).json(orders);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default orderController;
