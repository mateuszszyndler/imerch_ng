import mongoose, { Schema } from "mongoose";

const ReturnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
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
      default: 0,
    },
    time_period: String,
    refund_method: String,
    restocking_fee: Number,
    return_shipping_fee: Number,
    exceptions: [String],
  },
  { collection: "return_policies", timestamps: true }
);

ReturnSchema.statics.createOrUpdate = function (returnPolicyData) {
  return this.findOneAndUpdate({ _id: returnPolicyData._id }, returnPolicyData, {
    new: true,
    upsert: true,
  });
};

ReturnSchema.statics.getById = function (returnPolicyId) {
  return this.findById(returnPolicyId);
};

ReturnSchema.statics.getAll = function () {
  return this.find();
};

ReturnSchema.statics.getByField = function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

ReturnSchema.statics.countReturnPolicies = function () {
  return this.countDocuments();
};

ReturnSchema.statics.findReturnPoliciesByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

ReturnSchema.methods.saveOrUpdate = function () {
  return this.save();
};

ReturnSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

ReturnSchema.methods.isActive = function () {
  return this.is_active;
};

ReturnSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

ReturnSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

ReturnSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

ReturnSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  this.is_active = false;
  return this.save();
};

ReturnSchema.query.applyFilters = function (filters) {
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

const ReturnPolicy = mongoose.model("ReturnPolicy", ReturnSchema);

export default ReturnPolicy;
