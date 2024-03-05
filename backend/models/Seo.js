import mongoose, { Schema } from "mongoose";

const SeoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    canonical_url: {
      type: String,
      required: true,
    },
    og_title: {
      type: String,
      required: true,
    },
    og_description: {
      type: String,
      required: true,
    },
    og_image: {
      type: String,
      required: true,
    },
    twitter_title: {
      type: String,
      required: true,
    },
    twitter_description: {
      type: String,
      required: true,
    },
    twitter_image: {
      type: String,
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
      default: 0,
    },
  },
  { collection: "seo", timestamps: true }
);

SeoSchema.statics.createOrUpdate = function (seoData) {
  return this.findOneAndUpdate({ _id: seoData._id }, seoData, { upsert: true, new: true });
};

SeoSchema.statics.getById = function (seoId) {
  return this.findById(seoId);
};

SeoSchema.statics.getAll = function () {
  return this.find();
};

SeoSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

SeoSchema.statics.findActiveSEO = function () {
  return this.find({ is_active: true });
};

SeoSchema.statics.findInactiveSEO = function () {
  return this.find({ is_active: false });
};

SeoSchema.statics.findDeletedSEO = function () {
  return this.find({ deleted_at: { $ne: null } });
};

SeoSchema.statics.findSEOByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

SeoSchema.statics.restoreSEO = function (seoId) {
  return this.findByIdAndUpdate(seoId, { deleted_at: null }, { new: true });
};

SeoSchema.statics.countSEO = function () {
  return this.countDocuments();
};

SeoSchema.methods.saveOrUpdate = function () {
  return this.save();
};

SeoSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

SeoSchema.methods.isActive = function () {
  return this.is_active;
};

SeoSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

SeoSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

SeoSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

SeoSchema.query.applyFilters = function (filters) {
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

const SEO = mongoose.model("SEO", SeoSchema);

export default SEO;
