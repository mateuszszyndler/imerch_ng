import mongoose, { Schema } from "mongoose";

const SupportSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed", "in progress"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    tags: [String],
    attachments: [
      {
        name: String,
        url: String,
      },
    ],
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_phone: {
      type: String,
    },
    resolution: String,
    is_active: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    version: {
      type: Number,
      default: 0,
    },
    activity_log: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        action: String,
        timestamp: Date,
      },
    ],
  },
  { collection: "support_requests", timestamps: true }
);

SupportSchema.statics.applyFilters = function (filters) {
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

SupportSchema.statics.findSupportRequestsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

SupportSchema.statics.createOrUpdate = function (supportData) {
  if (supportData._id) {
    const supportId = supportData._id;
    delete supportData._id;
    return this.findByIdAndUpdate(supportId, supportData, { new: true });
  } else {
    return this.create(supportData);
  }
};

SupportSchema.statics.softDeleteOrRestore = function (supportId) {
  return this.findByIdAndUpdate(supportId, { deleted_at: { $not: { $eq: null } } }, { new: true });
};

SupportSchema.methods.isActive = function () {
  return this.is_active;
};

SupportSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

SupportSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

SupportSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

SupportSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

SupportSchema.statics.getById = function (id) {
  return this.findById(id);
};

SupportSchema.statics.getAll = function () {
  return this.find();
};

SupportSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

const Support = mongoose.model("Support", SupportSchema);

export default Support;
