import Product from "../models/Product.js";
import { errorHandler } from "../helpers/eventHandler.js";

const productController = {
  createOrUpdateProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const product = await Product.createOrUpdate(productData);
      res.json(product);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.getById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getProductsByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const products = await Product.getByField(field, value);
      res.json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findProductsByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const products = await Product.findProductsByStatus(status);
      res.json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countProducts: async (req, res, next) => {
    try {
      const count = await Product.countProducts();
      res.json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateProduct: async (req, res, next) => {
    try {
      const productData = req.body;
      const product = new Product(productData);
      const savedProduct = await product.saveOrUpdate();
      res.json(savedProduct);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await Product.getById(productId);
      await product.softDeleteOrRestore();
      res.json(product);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await Product.getUser(userId);
      res.json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getProductsByStoreId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const products = await Product.getProductsByStoreId(id);
      res.json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
  

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredProducts = await Product.find().applyFilters(filters);
      res.status(200).json(filteredProducts);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
  getBestProducts: async (req, res, next) => {
    try {
      const products = await Product.aggregate([
        {
          $project: {
            name: 1,
            description: 1,
            commentsCount: { $size: "$comments" },
            preview_images: 1,
            /* add other fields you want to return */
          },
        },
        {
          $sort: {
            commentsCount: -1,
          },
        },
        {
          $limit: 10, // or the desired limit
        },
      ]);
      res.status(200).json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
  

  getLatestProducts: async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit || "10");
      const products = await Product.getLatestProducts(limit);
      res.json(products);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getProductReviews: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const reviews = await Product.getProductReviews(productId);
      res.json(reviews);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default productController;
