import FAQ from "../models/Faq.js";
import { errorHandler } from "../helpers/eventHandler.js";

const faqController = {
  createOrUpdateFAQ: async (req, res, next) => {
    try {
      const faqData = req.body;
      const faq = await FAQ.createOrUpdate(faqData);
      res.status(200).json(faq);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  deleteFAQ: async (req, res, next) => {
    try {
      const faqId = req.params.id;
      const faq = await FAQ.findByIdAndRemove(faqId);
      res.status(200).json(faq);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  findFAQByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const faqs = await FAQ.findFAQByStatus(status);
      res.status(200).json(faqs);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  countFAQs: async (req, res, next) => {
    try {
      const count = await FAQ.countFAQs();
      res.status(200).json({ count });
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  saveOrUpdateFAQ: async (req, res, next) => {
    try {
      const faqData = req.body;
      const faq = await FAQ.saveOrUpdate(faqData);
      res.status(200).json(faq);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  softDeleteOrRestoreFAQ: async (req, res, next) => {
    try {
      const faqId = req.params.id;
      const faq = await FAQ.softDeleteOrRestore(faqId);
      res.status(200).json(faq);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getFAQ: async (req, res, next) => {
    try {
      const faqId = req.params.id;
      const faq = await FAQ.getById(faqId);
      res.status(200).json(faq);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getAllFAQs: async (req, res, next) => {
    try {
      const faqs = await FAQ.getAll();
      res.status(200).json(faqs);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getFAQsByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const faqs = await FAQ.getByField(field, value);
      res.status(200).json(faqs);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredFaqs = await FAQ.find().applyFilters(filters);
      res.status(200).json(filteredFaqs);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },

  getUser: async (req, res, next) => {
    try {
      // Logic to get the user associated with the FAQ
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default faqController;
