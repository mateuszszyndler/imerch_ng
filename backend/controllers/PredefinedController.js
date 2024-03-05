import PredefinedProduct from "../models/Predefined.js";
import { errorHandler } from "../helpers/eventHandler.js";

const predefinedProductController = {
  createOrUpdatePredefinedProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const product = await PredefinedProduct.createOrUpdate(productData);
      res.status(200).json(product);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deletePredefinedProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      await PredefinedProduct.deletePredefinedProduct(productId);
      res.sendStatus(204);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findPredefinedProductsByStatus: async (req, res, next) => {
    try {
      const status = req.params.status;
      const products = await PredefinedProduct.findPredefinedProductsByStatus(status);
      res.status(200).json(products);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countPredefinedProducts: async (req, res, next) => {
    try {
      const count = await PredefinedProduct.countPredefinedProducts();
      res.status(200).json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdatePredefinedProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const product = new PredefinedProduct(productData);
      const savedProduct = await product.saveOrUpdate();
      res.status(200).json(savedProduct);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestorePredefinedProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await PredefinedProduct.getById(productId);
      await product.softDeleteOrRestore();
      res.status(200).json(product);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getById: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await PredefinedProduct.getById(productId);
      res.status(200).json(product);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const products = await PredefinedProduct.getAll();
      res.status(200).json(products);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      const products = await PredefinedProduct.getByField(field, value);
      res.status(200).json(products);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredPredefinedProducts = await PredefinedProduct.find().applyFilters(filters);
      res.status(200).json(filteredPredefinedProducts);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default predefinedProductController;
