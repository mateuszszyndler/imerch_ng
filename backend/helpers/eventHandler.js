import winston, { format, transports } from "winston";
import useragent from "useragent";
import createError from "http-errors";
import pkg from "../package.json" assert { type: "json" };
import { EventLog, ErrorLog } from "../models/Analytics.js";

const { combine, timestamp, json } = format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: pkg.name },
  transports: [new transports.Console({ level: "info" }), new transports.Console({ level: "error" }), new transports.Console({ level: "warn" })],
  exceptionHandlers: [new transports.Console({ level: "error" })],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

const eventLogger = (eventType, message, req, additionalData = {}) => {
  const userAgent = req.headers ? req.headers["user-agent"] : "";
  const agent = useragent.parse(userAgent);

  const logData = {
    event_name: eventType,
    event_data: {
      message: message,
      page_viewed: req.url,
      timestamp: new Date(),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      url: req.protocol + "://" + req.get("host") + req.originalUrl,
      referrer_url: req.header("Referrer") || req.header("Referer"),
      device_info: `${agent.os.family} ${agent.os.major}.${agent.os.minor}; ${agent.device.family}`,
      userId: req.user ? req.user._id : undefined,
      additionalData,
    },
    created_at: new Date(),
    user_id: req.user ? req.user._id : undefined,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
    referrer: req.header("Referrer") || req.header("Referer"),
    page_url: req.originalUrl,
    version: 1,
  };

  const eventLog = new EventLog(logData);
  eventLog.save().catch((error) => {
    logger.error(`Error saving event log: ${error}`);
  });

  // Log the event with Winston
  logger.log({
    level: eventType,
    message: `Event: ${message} - ${req.originalUrl}`,
  });
};

export const eventHandler =
  (logLevel, eventName, additionalData = {}) =>
  (req, res, next) => {
    const message = `${eventName} - ${req.originalUrl}`;
    eventLogger(logLevel, message, req, additionalData);
    next();
  };

export const errorHandler = (err, req, res, next) => {
  const userAgent = req.headers ? req.headers["user-agent"] : "";
  const agent = useragent.parse(userAgent);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let level;

  if (statusCode >= 500) {
    level = "error";
  } else if (statusCode >= 400) {
    level = "warn";
  } else {
    level = "info";
  }

  if (!(err instanceof createError.HttpError)) {
    err = new createError(statusCode, message);
  }

  const errorLogData = {
    event_name: level,
    event_data: {
      message: message,
      stack: err.stack,
      timestamp: new Date(),
      url: req.protocol + "://" + req.get("host") + req.originalUrl,
      referrer_url: req.header("Referrer") || req.header("Referer"),
      device_info: `${agent.os.family} ${agent.os.major}.${agent.os.minor}; ${agent.device.family}`,
      userId: req.user ? req.user._id : undefined,
    },
    timestamp: new Date(),
    url: req.protocol + "://" + req.get("host") + req.originalUrl,
    referrer_url: req.header("Referrer") || req.header("Referer"),
    device_info: `${agent.os.family} ${agent.os.major}.${agent.os.minor}; ${agent.device.family}`,
    user_id: req.user ? req.user._id : undefined,
    additionalData: {},
    version: 1,
  };

  const errorLog = new ErrorLog(errorLogData);
  errorLog.save().catch((error) => {
    logger.error(`Error saving error log: ${error}`);
  });

  logger.log({ level, message: err.message });

  res.status(statusCode);
  res.json({
    status: "error",
    statusCode,
    message,
  });
};
