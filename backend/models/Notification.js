import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    deleted_at: Date,
    is_read: {
      type: Boolean,
      default: false,
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
  { collection: "notification", timestamps: true }
);

NotificationSchema.statics.createOrUpdate = function (notificationData) {
  if (notificationData._id) {
    const notificationId = notificationData._id;
    delete notificationData._id;
    return this.findByIdAndUpdate(notificationId, notificationData, {
      new: true,
    });
  } else {
    return this.create(notificationData);
  }
};

NotificationSchema.statics.getById = function (notificationId) {
  return this.findById(notificationId);
};

NotificationSchema.statics.getAll = function () {
  return this.find();
};

NotificationSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

NotificationSchema.statics.findNotificationsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

NotificationSchema.methods.saveOrUpdate = function () {
  return this.save();
};

NotificationSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

NotificationSchema.methods.isActive = function () {
  return this.is_active;
};

NotificationSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

NotificationSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

NotificationSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

NotificationSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

NotificationSchema.statics.applyFilters = function (filters) {
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

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
