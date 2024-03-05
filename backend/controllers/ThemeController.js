import Theme from "../models/Theme.js";
import { errorHandler } from "../helpers/eventHandler.js";

const themeController = {
  createOrUpdateTheme: async (req, res, next) => {
    try {
      const themeData = req.body;
      const theme = await Theme.createOrUpdate(themeData);
      res.status(200).json(theme);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteTheme: async (req, res, next) => {
    try {
      const themeId = req.params.themeId;
      const theme = await Theme.deleteTheme(themeId);
      res.status(200).json(theme);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findThemesByStatus: async (req, res, next) => {
    try {
      const status = req.query.status;
      const themes = await Theme.findThemesByStatus(status);
      res.status(200).json(themes);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countThemes: async (req, res, next) => {
    try {
      const count = await Theme.countThemes();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateTheme: async (req, res, next) => {
    try {
      const themeData = req.body;
      const theme = new Theme(themeData);
      const savedTheme = await theme.saveOrUpdate();
      res.status(200).json(savedTheme);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreTheme: async (req, res, next) => {
    try {
      const themeId = req.params.themeId;
      const theme = await Theme.softDeleteOrRestore(themeId);
      res.status(200).json(theme);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getTheme: async (req, res, next) => {
    try {
      const themeId = req.params.themeId;
      const theme = await Theme.getById(themeId);
      res.status(200).json(theme);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAllThemes: async (req, res, next) => {
    try {
      const themes = await Theme.getAll();
      res.status(200).json(themes);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getByField: async (req, res, next) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      const themes = await Theme.getByField(field, value);
      res.status(200).json(themes);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredThemes = await Theme.find().applyFilters(filters);
      res.status(200).json(filteredThemes);
    } catch (error) {
      errorHandler(error, req, res, next);
    }
  },
};

export default themeController;
