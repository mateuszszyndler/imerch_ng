import mongoose, { Schema } from "mongoose";

const EventLogSchema = new Schema(
  {
    event_name: String,
    event_data: Schema.Types.Mixed,
    ip_address: String,
    user_agent: String,
    referrer: String,
    page_url: String,
    version: Number,
    is_active: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

const ErrorLogSchema = new Schema(
  {
    event_name: String,
    event_data: Schema.Types.Mixed,
    stack: String,
    timestamp: Date,
    url: String,
    referrer_url: String,
    device_info: String,
    additionalData: Schema.Types.Mixed,
    version: Number,
    is_active: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

const LogSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    is_active: { type: Boolean, default: true },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

// 1. Centralized Filtering
EventLogSchema.query.applyFilters = function (filters) {
  let query = this;
  if (filters) {
    for (const field in filters) {
      if (filters.hasOwnProperty(field)) {
        const value = filters[field];
        if (typeof value === "object" && !Array.isArray(value)) {
          for (const operator in value) {
            if (value.hasOwnProperty(operator)) {
              const fieldValue = value[operator];
              switch (operator) {
                case "$gt":
                  query = query.where(field).gt(fieldValue);
                  break;
                case "$lt":
                  query = query.where(field).lt(fieldValue);
                  break;
                case "$ne":
                  query = query.where(field).ne(fieldValue);
                  break;
                default:
                  query = query.where(field).equals(fieldValue);
                  break;
              }
            }
          }
        } else {
          query = query.where(field).equals(value);
        }
      }
    }
  }
  return query;
};

// 3. Consolidated Finding Method
EventLogSchema.statics.findByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

// 4. Code Efficiency
EventLogSchema.methods.isActive = function () {
  return this.is_active;
};

EventLogSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

EventLogSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

EventLogSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

EventLogSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

EventLogSchema.statics.getById = function (id) {
  return this.findById(id);
};

EventLogSchema.statics.getAll = function () {
  return this.find();
};

EventLogSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

const EventLog = mongoose.model("EventLog", EventLogSchema);

// Apply the same changes to ErrorLogSchema
ErrorLogSchema.query.applyFilters = function (filters) {
  let query = this;
  if (filters) {
    for (const field in filters) {
      if (filters.hasOwnProperty(field)) {
        const value = filters[field];
        if (typeof value === "object" && !Array.isArray(value)) {
          for (const operator in value) {
            if (value.hasOwnProperty(operator)) {
              const fieldValue = value[operator];
              switch (operator) {
                case "$gt":
                  query = query.where(field).gt(fieldValue);
                  break;
                case "$lt":
                  query = query.where(field).lt(fieldValue);
                  break;
                case "$ne":
                  query = query.where(field).ne(fieldValue);
                  break;
                default:
                  query = query.where(field).equals(fieldValue);
                  break;
              }
            }
          }
        } else {
          query = query.where(field).equals(value);
        }
      }
    }
  }
  return query;
};

EventLogSchema.statics.createEventLog = function (eventLogData) {
  return this.create(eventLogData);
};

ErrorLogSchema.statics.findByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

ErrorLogSchema.methods.isActive = function () {
  return this.is_active;
};

ErrorLogSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

ErrorLogSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

ErrorLogSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

ErrorLogSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

ErrorLogSchema.statics.getById = function (id) {
  return this.findById(id);
};

ErrorLogSchema.statics.getAll = function () {
  return this.find();
};

ErrorLogSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

const ErrorLog = mongoose.model("ErrorLog", ErrorLogSchema);

// Apply the same changes to LogSchema
LogSchema.query.applyFilters = function (filters) {
  let query = this;
  if (filters) {
    for (const field in filters) {
      if (filters.hasOwnProperty(field)) {
        const value = filters[field];
        if (typeof value === "object" && !Array.isArray(value)) {
          for (const operator in value) {
            if (value.hasOwnProperty(operator)) {
              const fieldValue = value[operator];
              switch (operator) {
                case "$gt":
                  query = query.where(field).gt(fieldValue);
                  break;
                case "$lt":
                  query = query.where(field).lt(fieldValue);
                  break;
                case "$ne":
                  query = query.where(field).ne(fieldValue);
                  break;
                default:
                  query = query.where(field).equals(fieldValue);
                  break;
              }
            }
          }
        } else {
          query = query.where(field).equals(value);
        }
      }
    }
  }
  return query;
};

LogSchema.statics.findByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

LogSchema.methods.isActive = function () {
  return this.is_active;
};

LogSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

LogSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

LogSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

LogSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

LogSchema.statics.getById = function (id) {
  return this.findById(id);
};

LogSchema.statics.getAll = function () {
  return this.find();
};

LogSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

const Log = mongoose.model("Log", LogSchema);

export { EventLog, ErrorLog, Log };
