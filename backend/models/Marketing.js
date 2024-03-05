// filename: Marketing.js

import mongoose, { Schema } from "mongoose";

const MarketingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    deleted_at: Date,
    is_active: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { collection: "marketing", timestamps: true }
);

MarketingSchema.statics.createOrUpdate = function (marketingData) {
  if (marketingData._id) {
    return this.findByIdAndUpdate(marketingData._id, marketingData, { new: true });
  } else {
    return this.create(marketingData);
  }
};

MarketingSchema.statics.getById = function (marketingId) {
  return this.findById(marketingId);
};

MarketingSchema.statics.getAll = function () {
  return this.find();
};

MarketingSchema.statics.getByField = function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

MarketingSchema.statics.findMarketingByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

MarketingSchema.methods.saveOrUpdate = function () {
  return this.save();
};

MarketingSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

MarketingSchema.methods.isActive = function () {
  return this.is_active;
};

MarketingSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

MarketingSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

MarketingSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

MarketingSchema.query.applyFilters = function (filters) {
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

const Marketing = mongoose.model("Marketing", MarketingSchema);

export default Marketing;
