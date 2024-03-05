import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["client", "basic", "pro", "vip"],
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    configuration: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    ],
    features: [String],
    benefits: [String],
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
  },
  { collection: "subscriptions", timestamps: true }
);

SubscriptionSchema.statics.applyFilters = function (filters) {
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

SubscriptionSchema.statics.createOrUpdate = function (subscriptionData) {
  const { _id } = subscriptionData;
  if (_id) {
    return this.findByIdAndUpdate(_id, subscriptionData, { new: true });
  }
  return this.create(subscriptionData);
};

SubscriptionSchema.statics.getById = function (subscriptionId) {
  return this.findById(subscriptionId);
};

SubscriptionSchema.statics.getAll = function () {
  return this.find();
};

SubscriptionSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

SubscriptionSchema.statics.findActiveByStatus = function () {
  return this.find({ is_active: true });
};

SubscriptionSchema.statics.findInactiveByStatus = function () {
  return this.find({ is_active: false });
};

SubscriptionSchema.statics.findDeletedByStatus = function () {
  return this.find({ deleted_at: { $ne: null } });
};

SubscriptionSchema.statics.restore = function (subscriptionId) {
  return this.findByIdAndUpdate(subscriptionId, { deleted_at: null }, { new: true });
};

SubscriptionSchema.methods.saveOrUpdate = function () {
  return this.save();
};

SubscriptionSchema.methods.softDeleteOrRestore = function () {
  this.deleted_at = this.deleted_at ? null : new Date();
  return this.save();
};

SubscriptionSchema.methods.isActive = function () {
  return this.is_active;
};

SubscriptionSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

SubscriptionSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

SubscriptionSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

SubscriptionSchema.statics.findByType = function (type) {
  return this.find({ type });
};

SubscriptionSchema.statics.findByPeriod = function (period) {
  return this.find({ period });
};

SubscriptionSchema.statics.findActiveByTypeAndStatus = function (type) {
  return this.find({ type, is_active: true });
};

SubscriptionSchema.statics.findInactiveByTypeAndStatus = function (type) {
  return this.find({ type, is_active: false });
};

SubscriptionSchema.statics.findDeletedByTypeAndStatus = function (type) {
  return this.find({ type, deleted_at: { $ne: null } });
};

SubscriptionSchema.statics.findByPriceLessThan = function (price) {
  return this.find({ price: { $lt: price } });
};

SubscriptionSchema.statics.findByPriceGreaterThan = function (price) {
  return this.find({ price: { $gt: price } });
};

SubscriptionSchema.statics.findByDiscountGreaterThan = function (discount) {
  return this.find({ discount: { $gt: discount } });
};

SubscriptionSchema.statics.findByFeatures = function (feature) {
  return this.find({ features: feature });
};

SubscriptionSchema.statics.findByBenefits = function (benefit) {
  return this.find({ benefits: benefit });
};

SubscriptionSchema.statics.findByConfigurationField = function (field, value) {
  return this.find({ "configuration.name": field, "configuration.value": value });
};

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
