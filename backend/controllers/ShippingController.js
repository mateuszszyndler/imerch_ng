import Shipping from "../models/Shipping.js";
import { errorHandler } from "../helpers/eventHandler.js";

const shippingController = {
  createOrUpdateShipping: async (req, res, next) => {
    try {
      const shippingData = req.body;
      const shipping = await Shipping.createOrUpdate(shippingData);
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const deletedShipping = await Shipping.deleteShipping(shippingId);
      res.json(deletedShipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findShippingByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const shippings = await Shipping.findShippingByStatus(status);
      res.json(shippings);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countShippings: async (req, res, next) => {
    try {
      const count = await Shipping.countShippings();
      res.json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateShipping: async (req, res, next) => {
    try {
      const shippingData = req.body;
      const shippingId = req.params.shippingId;
      if (shippingId) {
        const updatedShipping = await Shipping.updateShipping(shippingId, shippingData);
        res.json(updatedShipping);
      } else {
        const createdShipping = await Shipping.createShipping(shippingData);
        res.json(createdShipping);
      }
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.softDeleteOrRestore(shippingId);
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getShippingById: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.getShipping(shippingId);
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllShippings: async (req, res, next) => {
    try {
      const shippings = await Shipping.getAll();
      res.json(shippings);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getShippingsByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const shippings = await Shipping.getByField(field, value);
      res.json(shippings);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveShipping: async (req, res, next) => {
    try {
      const shippingData = req.body;
      const shipping = new Shipping(shippingData);
      await shipping.saveShipping();
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  updateShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shippingData = req.body;
      const updatedShipping = await Shipping.updateShipping(shippingId, shippingData);
      res.json(updatedShipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.softDelete(shippingId);
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  isActiveShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.getShipping(shippingId);
      const isActive = shipping.isActive();
      res.json(isActive);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  activateShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.getShipping(shippingId);
      await shipping.activate();
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deactivateShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.getShipping(shippingId);
      await shipping.deactivate();
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  restoreShipping: async (req, res, next) => {
    try {
      const { shippingId } = req.params;
      const shipping = await Shipping.getShipping(shippingId);
      await shipping.restore();
      res.json(shipping);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredShippings = await Shipping.find().applyFilters(filters);
      res.status(200).json(filteredShippings);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default shippingController;
