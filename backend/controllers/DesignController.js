import Design from "../models/Design.js";
import { errorHandler } from "../helpers/eventHandler.js";

const designController = {
  createOrUpdateDesign: async (req, res, next) => {
    try {
      const designData = req.body;
      const design = await Design.createOrUpdate(designData);
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.deleteDesign(designId);
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findDesignByStatus: async (req, res, next) => {
    try {
      const status = req.params.status;
      const designs = await Design.findDesignByStatus(status);
      res.json(designs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countDesigns: async (req, res, next) => {
    try {
      const count = await Design.countDesigns();
      res.json({ count });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveOrUpdateDesign: async (req, res, next) => {
    try {
      const designData = req.body;
      const design = new Design(designData);
      const savedDesign = await design.saveOrUpdate();
      res.json(savedDesign);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const deleted_at = req.body.deleted_at;
      const design = await Design.softDeleteOrRestore(designId, deleted_at);
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getDesignById: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getAllDesigns: async (req, res, next) => {
    try {
      const designs = await Design.getAll();
      res.json(designs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getDesignsByField: async (req, res, next) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      const designs = await Design.getByField(field, value);
      res.json(designs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFilters: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredDesigns = await Design.find().applyFilters(filters);
      res.status(200).json(filteredDesigns);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  saveDesign: async (req, res, next) => {
    try {
      const designData = req.body;
      const design = new Design(designData);
      const savedDesign = await design.saveDesign();
      res.json(savedDesign);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.softDelete(designId);
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  isActiveDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      res.json({ isActive: design.isActive() });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  activateDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      await design.activate();
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deactivateDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      await design.deactivate();
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  restoreDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      await design.restore();
      res.json(design);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getPartnerForDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      const partner = await design.getPartner();
      res.json(partner);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getProductForDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      const product = await design.getProduct();
      res.json(product);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getPredefinedProductForDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      const predefinedProduct = await design.getPredefinedProduct();
      res.json(predefinedProduct);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getPrintAreaForDesign: async (req, res, next) => {
    try {
      const designId = req.params.id;
      const design = await Design.getById(designId);
      const printArea = await design.getPrintArea();
      res.json(printArea);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default designController;
