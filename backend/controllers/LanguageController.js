import Language from "../models/Language.js";
import { errorHandler } from "../helpers/eventHandler.js";

const languageController = {
  createOrUpdateLanguage: async (req, res, next) => {
    try {
      const languageData = req.body;
      const language = await Language.createOrUpdate(languageData);
      res.status(200).json(language);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getLanguage: async (req, res, next) => {
    try {
      const { languageId } = req.params;
      const language = await Language.getById(languageId);
      res.status(200).json(language);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAllLanguages: async (req, res, next) => {
    try {
      const languages = await Language.getAll();
      res.status(200).json(languages);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getLanguagesByField: async (req, res, next) => {
    try {
      const { field, value } = req.query;
      const languages = await Language.getByField(field, value);
      res.status(200).json(languages);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findLanguagesByStatus: async (req, res, next) => {
    try {
      const { status } = req.query;
      const languages = await Language.findLanguagesByStatus(status);
      res.status(200).json(languages);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countLanguages: async (req, res, next) => {
    try {
      const count = await Language.countLanguages();
      res.status(200).json({ count });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateLanguage: async (req, res, next) => {
    try {
      const language = req.body;
      const savedLanguage = await language.saveOrUpdate();
      res.status(200).json(savedLanguage);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreLanguage: async (req, res, next) => {
    try {
      const { languageId } = req.params;
      const language = await Language.getById(languageId);
      await language.softDeleteOrRestore();
      res.sendStatus(200);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getLanguageUser: async (req, res, next) => {
    try {
      const { languageId } = req.params;
      const language = await Language.getById(languageId);
      const user = await language.getUser();
      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredLanguage = await Language.find().applyFilters(filters);
      res.status(200).json(filteredLanguage);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default languageController;
