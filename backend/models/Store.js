import mongoose, { Schema } from "mongoose";

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    store_details: {
      type: Schema.Types.Mixed,
    },
    avatar: String,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    theme_id: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
    },
    customizations: {
      type: Schema.Types.Mixed,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
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
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    inventory: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    order_history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    sales: [
      {
        type: Number,
        default: 0,
      },
    ],
    order_count: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    change_history: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        details: {
          type: Schema.Types.Mixed,
        },
      },
    ],
  },
  { collection: "stores", timestamps: true }
);

StoreSchema.statics.createOrUpdate = function (storeData) {
  if (storeData._id) {
    const updatedData = { ...storeData };
    delete updatedData._id;
    return this.findByIdAndUpdate(storeData._id, updatedData, { new: true });
  } else {
    return this.create(storeData);
  }
};

StoreSchema.statics.getById = function (storeId) {
  return this.findById(storeId);
};

StoreSchema.statics.getAll = function () {
  return this.find();
};

StoreSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

StoreSchema.query.applyFilters = function (filters) {
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

StoreSchema.statics.findStoresByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

StoreSchema.methods.saveOrUpdate = function () {
  return this.save();
};

StoreSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

StoreSchema.methods.isActive = function () {
  return this.is_active;
};

StoreSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

StoreSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

StoreSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

StoreSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

StoreSchema.statics.getTopStores = function (limit, sortBy) {
  return this.find().sort({ [sortBy]: -1 }).limit(limit);
};


const Store = mongoose.model("Store", StoreSchema);

export default Store;
