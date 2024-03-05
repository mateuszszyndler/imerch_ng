import express from "express";
import AnalyticsController from "../controllers/AnalyticsController.js";
import { isAuthenticated, hasRole } from "../middleware/authMiddleware.js";
import Validator from "../validators/Validator.js";
import { EventLog, Log } from "../models/Analytics.js";

const router = express.Router();

// POST /api/analytics (Log a new analytic event)
router.post("/analytics", async (req, res) => {
  try {
    const newAnalytic = new EventLog(req.body);
    await newAnalytic.save();
    res.status(201).json(newAnalytic);
  } catch (error) {
    console.error(error); // log the error to the console
    res.status(500).json({ message: "Error logging analytics", error: error.message });
  }
});

router.post("/logs", async (req, res) => {
  try {
    const logEntry = new Log({ message: req.body.message });
    await logEntry.save();
    res.status(201).json(logEntry);
  } catch (error) {
    res.status(500).json({ message: "Error while saving log:", error });
  }
});

// EventLog Routes
router.get("/event-logs/:status", isAuthenticated, hasRole(["Admin"]), AnalyticsController.findEventLogByStatus);
router.get("/event-logs/count", isAuthenticated, hasRole(["Admin"]), AnalyticsController.countEventLogs);
router.post("/event-logs", isAuthenticated, hasRole(["Admin"]), Validator, AnalyticsController.createOrUpdateEventLog);
router.put("/event-logs/:id", isAuthenticated, hasRole(["Admin"]), Validator, AnalyticsController.createOrUpdateEventLog);
router.delete("/event-logs/:id", isAuthenticated, hasRole(["Admin"]), AnalyticsController.deleteEventLog);
router.get("/event-logs/user/:userId", isAuthenticated, hasRole(["Admin"]), AnalyticsController.getUserEventLog);
router.post("/event-logs/apply-filters", isAuthenticated, hasRole(["Admin"]), AnalyticsController.applyFiltersEventLog); // This is QUERY PARAMS

// ErrorLog Routes
router.get("/error-logs/:status", isAuthenticated, hasRole(["Admin"]), AnalyticsController.findErrorLogByStatus);
router.get("/error-logs/count", isAuthenticated, hasRole(["Admin"]), AnalyticsController.countErrorLogs);
router.post("/error-logs", isAuthenticated, hasRole(["Admin"]), Validator, AnalyticsController.createOrUpdateErrorLog);
router.put("/error-logs/:id", isAuthenticated, hasRole(["Admin"]), Validator, AnalyticsController.createOrUpdateErrorLog);
router.delete("/error-logs/:id", isAuthenticated, hasRole(["Admin"]), AnalyticsController.deleteErrorLog);
router.get("/error-logs/user/:userId", isAuthenticated, hasRole(["Admin"]), AnalyticsController.getUserErrorLog);
router.post("/error-logs/apply-filters", isAuthenticated, hasRole(["Admin"]), AnalyticsController.applyFiltersErrorLog); // This is QUERY PARAMS

// Log Routes
router.get("/logs/:status", isAuthenticated, hasRole(["Admin"]), AnalyticsController.findLogByStatus);
router.get("/logs/count", isAuthenticated, hasRole(["Admin"]), AnalyticsController.countLogs);
router.put("/logs/:id", isAuthenticated, hasRole(["Admin"]), Validator, AnalyticsController.createOrUpdateLog);
router.delete("/logs/:id", isAuthenticated, hasRole(["Admin"]), AnalyticsController.deleteLog);
router.get("/logs/user/:userId", isAuthenticated, hasRole(["Admin"]), AnalyticsController.getUserLog);
router.get("/logs/apply-filters", isAuthenticated, hasRole(["Admin"]), AnalyticsController.applyFiltersLog); // This is QUERY PARAMS

export default router;
