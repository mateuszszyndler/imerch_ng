import mongoose, { Schema } from "mongoose";

const LanguageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    deleted_at: Date,
    is_active: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { collection: "language", timestamps: true }
);

LanguageSchema.statics.createOrUpdate = function (languageData) {
  if (languageData._id) {
    return this.findByIdAndUpdate(languageData._id, languageData, {
      new: true,
    });
  } else {
    return this.create(languageData);
  }
};

LanguageSchema.statics.getById = function (languageId) {
  return this.findById(languageId);
};

LanguageSchema.statics.getAll = function () {
  return this.find();
};

LanguageSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

LanguageSchema.statics.findLanguagesByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

LanguageSchema.methods.saveOrUpdate = function () {
  return this.save();
};

LanguageSchema.methods.softDeleteOrRestore = function () {
  this.deleted_at = this.deleted_at ? null : new Date();
  return this.save();
};

LanguageSchema.methods.isActive = function () {
  return this.is_active;
};

LanguageSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

LanguageSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

LanguageSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

LanguageSchema.query.applyFilters = function (filters) {
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

const Language = mongoose.model("Language", LanguageSchema);

export default Language;
