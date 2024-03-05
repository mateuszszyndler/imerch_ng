import mongoose, { Schema } from "mongoose";

const PredefinedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["tshirt", "hoodie", "sweatshirt", "tanktop", "longsleeve", "polo", "jacket", "shorts", "pants", "hat", "bag", "shoes", "socks", "accessories"],
    },
    print_areas: [
      {
        name: {
          type: String,
          required: true,
          enum: ["Large Plate", "Medium Plate", "Small Plate", "Sleeve Printing Plate"],
        },
        description: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
          enum: ["cm", "mm", "in", "px"],
        },
      },
    ],
    sizes: [
      {
        name: {
          type: String,
          required: true,
          enum: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
        },
        description: {
          type: String,
          required: true,
        },
        dimensions: {
          length: {
            type: Number,
            default: null,
          },
          width: {
            type: Number,
            default: null,
          },
          height: {
            type: Number,
            default: null,
          },
          diameter: {
            type: String,
            default: null,
            enum: ["xs", "s", "m", "l", "xl", "xxl", "xxxl"],
          },
          gauge: {
            type: Number,
            default: null,
          },
        },
        size_system: {
          type: String,
          default: null,
          enum: ["us", "eu", "uk", "cm", "in"],
        },
        size_type: {
          type: String,
          default: null,
          enum: ["regular", "slim", "loose", "oversize"],
        },
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      required: true,
      enum: ["man", "woman", "unisex", "kids", "baby"],
    },
    tax: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
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
    timestamps: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "predefined_products", timestamps: true }
);

// Static methods
PredefinedSchema.statics.createOrUpdate = async function (productData) {
  if (productData._id) {
    const productId = productData._id;
    delete productData._id;
    return this.findByIdAndUpdate(productId, productData, { new: true });
  } else {
    return this.create(productData);
  }
};

PredefinedSchema.statics.getById = async function (productId) {
  return this.findById(productId);
};

PredefinedSchema.statics.getAll = async function () {
  return this.find();
};

PredefinedSchema.statics.getByField = async function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

// Instance methods
PredefinedSchema.methods.saveOrUpdate = async function () {
  return this.save();
};

PredefinedSchema.methods.softDeleteOrRestore = async function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

PredefinedSchema.methods.isActive = function () {
  return this.is_active;
};

PredefinedSchema.methods.activate = async function () {
  this.is_active = true;
  return this.save();
};

PredefinedSchema.methods.deactivate = async function () {
  this.is_active = false;
  return this.save();
};

PredefinedSchema.methods.restore = async function () {
  this.deleted_at = null;
  return this.save();
};

PredefinedSchema.methods.softDelete = async function () {
  this.deleted_at = new Date();
  return this.save();
};

// Query methods
PredefinedSchema.query.applyFilters = function (filters) {
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

PredefinedSchema.statics.findPredefinedProductsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

const PredefinedProduct = mongoose.model("PredefinedProduct", PredefinedSchema);

export default PredefinedProduct;
