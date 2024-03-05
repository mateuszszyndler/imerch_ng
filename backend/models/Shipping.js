import mongoose, { Schema } from "mongoose";

const ShippingSchema = new Schema(
  {
    carrier: {
      type: String,
      required: true,
    },
    estimated_delivery_time: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { collection: "shippings", timestamps: true }
);

ShippingSchema.statics.createOrUpdate = async function (shippingData) {
  const shippingId = shippingData._id;
  if (shippingId) {
    const updatedShipping = await this.findByIdAndUpdate(shippingId, shippingData, { new: true });
    return updatedShipping;
  } else {
    const createdShipping = await this.create(shippingData);
    return createdShipping;
  }
};

ShippingSchema.statics.getById = async function (shippingId) {
  return this.findById(shippingId);
};

ShippingSchema.statics.getAll = async function () {
  return this.find();
};

ShippingSchema.statics.getByField = async function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

ShippingSchema.statics.softDeleteOrRestore = async function (shippingId) {
  const shipping = await this.findById(shippingId);
  if (shipping.deleted_at === null) {
    shipping.deleted_at = new Date();
  } else {
    shipping.deleted_at = null;
  }
  return shipping.save();
};

ShippingSchema.methods.isActive = function () {
  return this.is_active;
};

ShippingSchema.methods.activate = async function () {
  this.is_active = true;
  return this.save();
};

ShippingSchema.methods.deactivate = async function () {
  this.is_active = false;
  return this.save();
};

ShippingSchema.methods.restore = async function () {
  this.deleted_at = null;
  return this.save();
};

ShippingSchema.methods.softDelete = async function () {
  this.deleted_at = new Date();
  return this.save();
};

ShippingSchema.statics.applyFilters = function (filters) {
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

ShippingSchema.statics.findShippingByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

const Shipping = mongoose.model("Shipping", ShippingSchema);

export default Shipping;
