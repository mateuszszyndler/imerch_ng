import mongoose, { Schema } from "mongoose";

const DesignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    predefined_product_id: {
      type: Schema.Types.ObjectId,
      ref: "PredefinedProduct",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    design_preview: [
      {
        type: String,
      },
    ],
    design_file_urls: [
      {
        type: String,
      },
    ],
    dimensions: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      top: {
        type: Number,
        required: true,
      },
      left: {
        type: Number,
        required: true,
      },
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
  { collection: "designs", timestamps: true }
);

DesignSchema.statics.createOrUpdate = async function (designData) {
  if (designData._id) {
    return this.findByIdAndUpdate(designData._id, designData, { new: true });
  } else {
    return this.create(designData);
  }
};

DesignSchema.statics.softDeleteOrRestore = async function (designId, deleted_at) {
  const design = await this.findById(designId);
  if (design) {
    design.deleted_at = deleted_at;
    return design.save();
  }
  return null;
};

DesignSchema.statics.getAll = async function () {
  return this.find();
};

DesignSchema.statics.getByField = async function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

DesignSchema.statics.getById = async function (designId) {
  return this.findById(designId);
};

DesignSchema.methods.saveOrUpdate = async function () {
  return this.save();
};

DesignSchema.methods.softDelete = async function () {
  this.deleted_at = new Date();
  return this.save();
};

DesignSchema.methods.isActive = function () {
  return this.is_active;
};

DesignSchema.methods.activate = async function () {
  this.is_active = true;
  return this.save();
};

DesignSchema.methods.deactivate = async function () {
  this.is_active = false;
  return this.save();
};

DesignSchema.methods.restore = async function () {
  this.deleted_at = null;
  return this.save();
};

DesignSchema.methods.getPartner = function () {
  return mongoose.model("Partner").findById(this.partner_id);
};

DesignSchema.methods.getProduct = function () {
  return mongoose.model("Product").findById(this.product_id);
};

DesignSchema.methods.getPredefinedProduct = function () {
  return mongoose.model("PredefinedProduct").findById(this.predefined_product_id);
};

DesignSchema.methods.getPrintArea = function () {
  return mongoose.model("PrintArea").findById(this.print_area_id);
};

DesignSchema.statics.applyFilters = function (filters) {
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

DesignSchema.statics.findDesignByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

const Design = mongoose.model("Design", DesignSchema);

export default Design;
