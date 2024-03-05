// Filename: StoreController.js

import Store from "../models/Store.js";
import { errorHandler } from "../helpers/eventHandler.js";

const storeController = {
  createOrUpdateStore: async (req, res, next) => {
    try {
      const storeData = req.body;
      const store = await Store.createOrUpdate(storeData);
      res.status(200).json(store);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteStore: async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const store = await Store.findByIdAndDelete(storeId);
      res.status(200).json(store);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findStoresByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const stores = await Store.findStoresByStatus(status);
      res.status(200).json(stores);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countStores: async (req, res, next) => {
    try {
      const count = await Store.countDocuments();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateStore: async (req, res, next) => {
    try {
      const store = req.body;
      const savedStore = await store.saveOrUpdate();
      res.status(200).json(savedStore);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreStore: async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const store = await Store.findById(storeId);
      if (store) {
        await store.softDeleteOrRestore();
        res.status(200).json(store);
      } else {
        res.status(404).json({ message: "Store not found" });
      }
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getStore: async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const store = await Store.getById(storeId);
      res.status(200).json(store);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAllStores: async (req, res, next) => {
    try {
      const stores = await Store.getAll();
      res.status(200).json(stores);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getStoresByField: async (req, res, next) => {
    try {
        const { field, value } = req.query;
        const stores = await Store.getByField(field, value);
        res.status(200).json(stores);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
},


  getTopStores: async (req, res, next) => {
    try {
      const limit = 10;
      const sortBy = "order_count"; // Replace with the field you want to sort by
      const topStores = await Store.getTopStores(limit, sortBy);
      res.status(200).json(topStores);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
  

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredStores = await Store.find().applyFilters(filters);
      res.status(200).json(filteredStores);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default storeController;
