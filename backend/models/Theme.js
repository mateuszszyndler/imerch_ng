import mongoose, { Schema } from "mongoose";

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    store_id: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    primary_color: String,
    secondary_color: String,
    background_color: String,
    font: String,
    header_image: String,
    footer_image: String,
    menu_image: String,
    background_image: String,
    custom_css: String,
  },
  { collection: "themes", timestamps: true }
);

ThemeSchema.statics.createOrUpdate = function (themeData) {
  if (themeData._id) {
    const themeId = themeData._id;
    delete themeData._id;
    return this.findByIdAndUpdate(themeId, themeData, { new: true });
  } else {
    return this.create(themeData);
  }
};

ThemeSchema.statics.getById = function (themeId) {
  return this.findById(themeId);
};

ThemeSchema.statics.getAll = function () {
  return this.find();
};

ThemeSchema.statics.getByField = function (field, value) {
  const filters = {};
  filters[field] = value;
  return this.applyFilters(filters);
};

ThemeSchema.query.applyFilters = function (filters) {
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

ThemeSchema.statics.findThemesByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

ThemeSchema.methods.saveOrUpdate = function () {
  return this.save();
};

ThemeSchema.methods.softDeleteOrRestore = function () {
  this.deleted_at = this.deleted_at ? null : new Date();
  return this.save();
};

ThemeSchema.methods.isActive = function () {
  return this.is_active;
};

ThemeSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

ThemeSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

ThemeSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

ThemeSchema.statics.findByPartner = function (partnerId) {
  return this.find({ partner_id: partnerId });
};

ThemeSchema.statics.findByStore = function (storeId) {
  return this.find({ store_id: storeId });
};

ThemeSchema.statics.findByColor = function (color) {
  return this.find({
    $or: [{ primary_color: color }, { secondary_color: color }],
  });
};

ThemeSchema.statics.findByFont = function (font) {
  return this.find({ font: font });
};

ThemeSchema.statics.findByHeaderImage = function (headerImage) {
  return this.find({ header_image: headerImage });
};

ThemeSchema.statics.findByFooterImage = function (footerImage) {
  return this.find({ footer_image: footerImage });
};

ThemeSchema.statics.findByMenuImage = function (menuImage) {
  return this.find({ menu_image: menuImage });
};

ThemeSchema.statics.findByBackgroundImage = function (backgroundImage) {
  return this.find({ background_image: backgroundImage });
};

ThemeSchema.statics.findDeletedByPartner = function (partnerId) {
  return this.find({ partner_id: partnerId, deleted_at: { $ne: null } });
};

ThemeSchema.statics.findActiveByStore = function (storeId) {
  return this.find({ store_id: storeId, is_active: true });
};

ThemeSchema.statics.findInactiveByStore = function (storeId) {
  return this.find({ store_id: storeId, is_active: false });
};

ThemeSchema.statics.findByKeyword = function (keyword) {
  return this.find({
    $or: [{ name: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
  });
};

ThemeSchema.statics.findByVersion = function (version) {
  return this.find({ version: version });
};

ThemeSchema.statics.findByCreatedAtRange = function (startDate, endDate) {
  return this.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });
};

const Theme = mongoose.model("Theme", ThemeSchema);

export default Theme;
