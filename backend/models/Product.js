import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    design_id: {
      type: Schema.Types.ObjectId,
      ref: "Design",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    store_id: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    predefined_id: {
      type: Schema.Types.ObjectId,
      ref: "Predefined",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      required: true,
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
    preview_images: [
      {
        type: String,
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
      default: 1,
    },
    timestamps: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "products", timestamps: true }
);

ProductSchema.query.applyFilters = function (filters) {
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

ProductSchema.statics.createOrUpdate = async function (productData) {
  if (productData._id) {
    return this.findByIdAndUpdate(productData._id, productData, { new: true });
  } else {
    return this.create(productData);
  }
};

ProductSchema.statics.getById = async function (productId) {
  return this.findById(productId);
};

ProductSchema.statics.getAll = async function () {
  return this.find();
};

ProductSchema.statics.getByField = async function (field, value) {
  return this.find({ [field]: value });
};

ProductSchema.statics.findProductsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

ProductSchema.statics.countProducts = async function () {
  return this.countDocuments();
};

ProductSchema.methods.saveOrUpdate = async function () {
  return this.save();
};

ProductSchema.methods.softDeleteOrRestore = async function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

ProductSchema.methods.isActive = function () {
  return this.is_active;
};

ProductSchema.methods.activate = async function () {
  this.is_active = true;
  return this.save();
};

ProductSchema.methods.deactivate = async function () {
  this.is_active = false;
  return this.save();
};

ProductSchema.methods.restore = async function () {
  this.deleted_at = null;
  return this.save();
};

ProductSchema.methods.softDelete = async function () {
  this.deleted_at = new Date();
  return this.save();
};

ProductSchema.statics.getProductsByStoreId = async function (storeId) {
  return this.find({ store_id: storeId });
};

ProductSchema.statics.getBestProducts = async function () {
  return this.find().sort({ comments: -1 }).limit(10);
};

ProductSchema.statics.getLatestProducts = async function (limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

ProductSchema.statics.getProductReviews = async function (productId) {
  const product = await this.findById(productId);
  return product ? product.reviews : [];
};

const Product = mongoose.model("Product", ProductSchema);

export default Product;
