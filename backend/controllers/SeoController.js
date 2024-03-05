import SEO from "../models/Seo.js";
import { errorHandler } from "../helpers/eventHandler.js";

const seoController = {
  createOrUpdateSEO: async (req, res, next) => {
    try {
      const seoData = req.body;
      const seo = await SEO.createOrUpdate(seoData);
      res.status(201).json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const deletedSEO = await SEO.findByIdAndDelete(seoId);
      res.json(deletedSEO);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findSEOByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const seoList = await SEO.findSEOByStatus(status);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countSEO: async (req, res, next) => {
    try {
      const count = await SEO.countSEO();
      res.json(count);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateSEO: async (req, res, next) => {
    try {
      const seoData = req.body;
      const seo = new SEO(seoData);
      await seo.saveOrUpdate();
      res.status(201).json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      await seo.softDeleteOrRestore();
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllSEO: async (req, res, next) => {
    try {
      const seoList = await SEO.getAll();
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getByFieldSEO: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const seoList = await SEO.getByField(field, value);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredSeo = await SEO.find().applyFilters(filters);
      res.status(200).json(filteredSeo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveSEO: async (req, res, next) => {
    try {
      const seoData = req.body;
      const seo = new SEO(seoData);
      await seo.save();
      res.status(201).json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      await seo.softDelete();
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  isActiveSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      const isActive = seo.isActive();
      res.json({ isActive });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  activateSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      await seo.activate();
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deactivateSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.getById(seoId);
      await seo.deactivate();
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  restoreSEO: async (req, res, next) => {
    try {
      const { seoId } = req.params;
      const seo = await SEO.restoreSEO(seoId);
      res.json(seo);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findByTitleSEO: async (req, res, next) => {
    try {
      const { title } = req.query;
      const seoList = await SEO.findByTitle(title);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findByKeywordsSEO: async (req, res, next) => {
    try {
      const { keywords } = req.query;
      const seoList = await SEO.findByKeywords(keywords);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findByVersionSEO: async (req, res, next) => {
    try {
      const { version } = req.query;
      const seoList = await SEO.findByVersion(version);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findByCreatedAtRangeSEO: async (req, res, next) => {
    try {
      const { startDate, endDate } = req.query;
      const seoList = await SEO.findByCreatedAtRange(startDate, endDate);
      res.json(seoList);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default seoController;
