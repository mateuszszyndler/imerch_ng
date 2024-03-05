import { errorHandler } from "../helpers/eventHandler.js";
import { EventLog, ErrorLog, Log } from "../models/Analytics.js";

const AnalyticsController = {
  // EventLog CRUD Operations
  createOrUpdateEventLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let eventLog;
      if (id) {
        eventLog = await EventLog.findByIdAndUpdate(id, data, { new: true });
      } else {
        eventLog = await EventLog.create(data);
      }
      res.status(200).json(eventLog);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteEventLog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const eventLog = await EventLog.findByIdAndDelete(id);
      res.status(200).json(eventLog);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findEventLogByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const eventLogs = await EventLog.findByStatus(status);
      res.status(200).json(eventLogs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countEventLogs: async (req, res, next) => {
    try {
      const count = await EventLog.countDocuments();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // ErrorLog CRUD Operations
  createOrUpdateErrorLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let errorLog;
      if (id) {
        errorLog = await ErrorLog.findByIdAndUpdate(id, data, { new: true });
      } else {
        errorLog = await ErrorLog.create(data);
      }
      res.status(200).json(errorLog);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteErrorLog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const errorLog = await ErrorLog.findByIdAndDelete(id);
      res.status(200).json(errorLog);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findErrorLogByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const errorLogs = await ErrorLog.findByStatus(status);
      res.status(200).json(errorLogs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countErrorLogs: async (req, res, next) => {
    try {
      const count = await ErrorLog.countDocuments();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // Log CRUD Operations
  createOrUpdateLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let log;
      if (id) {
        log = await Log.findByIdAndUpdate(id, data, { new: true });
      } else {
        log = await Log.create(data);
      }
      res.status(200).json(log);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  deleteLog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const log = await Log.findByIdAndDelete(id);
      res.status(200).json(log);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  findLogByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const logs = await Log.findByStatus(status);
      res.status(200).json(logs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  countLogs: async (req, res, next) => {
    try {
      const count = await Log.countDocuments();
      res.status(200).json(count);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // Custom Operations for EventLog
  saveOrUpdateEventLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let model;
      if (id) {
        model = await EventLog.findByIdAndUpdate(id, data, { new: true });
      } else {
        model = await EventLog.create(data);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreEventLog: async (req, res, next) => {
    try {
      const { id, restore } = req.params;
      let model;
      if (restore === "true") {
        model = await EventLog.restore(id);
      } else {
        model = await EventLog.softDelete(id);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUserEventLog: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await EventLog.getByField("user_id", userId);
      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFiltersEventLog: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredEventLogs = await EventLog.find().applyFilters(filters);
      res.status(200).json(filteredEventLogs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // Custom Operations for ErrorLog
  saveOrUpdateErrorLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let model;
      if (id) {
        model = await ErrorLog.findByIdAndUpdate(id, data, { new: true });
      } else {
        model = await ErrorLog.create(data);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreErrorLog: async (req, res, next) => {
    try {
      const { id, restore } = req.params;
      let model;
      if (restore === "true") {
        model = await ErrorLog.restore(id);
      } else {
        model = await ErrorLog.softDelete(id);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUserErrorLog: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await ErrorLog.getByField("user_id", userId);
      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFiltersErrorLog: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredErrorLogs = await ErrorLog.find().applyFilters(filters);
      res.status(200).json(filteredErrorLogs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  // Custom Operations for Log
  saveOrUpdateLog: async (req, res, next) => {
    try {
      const { id, data } = req.body;
      let model;
      if (id) {
        model = await Log.findByIdAndUpdate(id, data, { new: true });
      } else {
        model = await Log.create(data);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  softDeleteOrRestoreLog: async (req, res, next) => {
    try {
      const { id, restore } = req.params;
      let model;
      if (restore === "true") {
        model = await Log.restore(id);
      } else {
        model = await Log.softDelete(id);
      }
      res.status(200).json(model);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  getUserLog: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await Log.getByField("user_id", userId);
      res.status(200).json(user);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },

  applyFiltersLog: async (req, res, next) => {
    try {
      const filters = req.query;
      const filteredLogs = await Log.find().applyFilters(filters);
      res.status(200).json(filteredLogs);
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  },
};

export default AnalyticsController;
