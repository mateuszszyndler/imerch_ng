import mongoose, { Schema } from "mongoose";

const FaqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
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
  { collection: "faq", timestamps: true }
);

FaqSchema.statics.createOrUpdate = function (faqData) {
  if (faqData._id) {
    return this.findByIdAndUpdate(faqData._id, faqData, { new: true });
  } else {
    return this.create(faqData);
  }
};

FaqSchema.statics.getById = function (faqId) {
  return this.findById(faqId);
};

FaqSchema.statics.getAll = function () {
  return this.find();
};

FaqSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

FaqSchema.statics.findFAQByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

FaqSchema.methods.saveOrUpdate = function () {
  return this.save();
};

FaqSchema.methods.softDeleteOrRestore = function () {
  this.deleted_at = this.deleted_at ? null : new Date();
  return this.save();
};

FaqSchema.methods.isActive = function () {
  return this.is_active;
};

FaqSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

FaqSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

FaqSchema.query.applyFilters = function (filters) {
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

const FAQ = mongoose.model("FAQ", FaqSchema);

export default FAQ;
