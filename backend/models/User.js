import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    password_reset_token: String,
    password_reset_token_expiration: Date,
    password_refresh_token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["client", "partner", "admin"],
    },
    avatar: String,
    subscription: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Subscription",
      },
      start_date: Date,
      expiration_date: Date,
      plan: {
        type: String,
        enum: ["user", "basic", "pro", "vip"],
      },
      type: {
        type: String,
        enum: ["monthly", "quarterly", "annually"],
      },
      price: Number,
      discount: Number,
      subscription_status: {
        type: String,
        enum: ["active", "inactive", "pending", "cancelled", "expired"],
      },
    },
    social_media_profiles: [
      {
        platform: String,
        profile_url: String,
      },
    ],
    address: [
      {
        address_name: {
          type: String,
          required: true,
        },
        business_name: {
          type: String,
          default: "",
        },
        address_line_1: {
          type: String,
          required: true,
        },
        address_line_2: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          required: true,
        },
        state_id: {
          type: String,
          required: true,
        },
        country_id: {
          type: String,
          required: true,
        },
        zip_code: {
          type: String,
          required: true,
        },
        phone_number: {
          type: String,
          required: true,
        },
        is_default: {
          type: Boolean,
          default: false,
        },
        is_business: {
          type: Boolean,
          default: false,
        },
      },
    ],
    last_delivery_method: String,
    profile_history: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: false,
      },
    ],
    partner_profile: [
      {
        business_name: String,
        business_email: String,
        business_website: String,
        business_description: String,
        business_logo: String,
        business_social_media: [
          {
            platform: String,
            profile_url: String,
          },
        ],
        business_categories: [
          {
            business_type: String,
            business_category: String,
            business_subcategory: String,
          },
        ],
        stores: [
          {
            type: Schema.Types.ObjectId,
            ref: "Store",
          },
        ],
        themes: [
          {
            type: Schema.Types.ObjectId,
            ref: "Theme",
          },
        ],
        tax_numbers: {
          NIP: String,
          Regon: String,
          KRS: String,
        },
      },
    ],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    user_rating: Number,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    auth_methods: [
      {
        auth_method: String,
        provider_id: String,
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { collection: "users", timestamps: true }
);

UserSchema.query.applyFilters = function (filters) {
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

UserSchema.statics.findUserByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

UserSchema.statics.createOrUpdate = function (userData) {
  if (userData._id) {
    const id = userData._id;
    delete userData._id;
    return this.findByIdAndUpdate(id, userData, { new: true });
  } else {
    return this.create(userData);
  }
};

UserSchema.methods.saveOrUpdate = function () {
  return this.save();
};

UserSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at === null) {
    this.deleted_at = new Date();
  } else {
    this.deleted_at = null;
  }
  return this.save();
};

UserSchema.methods.getPendingOrders = async function () {
  try {
    const OrderModel = mongoose.model("Order");
    return await OrderModel.find({ user_id: this._id, status: "pending" }).exec();
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.calculateUserRating = async function () {
  try {
    const ProductModel = mongoose.model("Product");
    const CommentModel = mongoose.model("Comment");
    const ReviewModel = mongoose.model("Review");

    const products = await ProductModel.find({ user_id: this._id }).exec();
    const comments = await CommentModel.find({ user_id: this._id }).exec();
    const reviews = await ReviewModel.find({ user_id: this._id }).exec();

    const averageRatingWeight = 0.3;
    const commentsWeight = 0.2;
    const reviewsWeight = 0.1;

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    const commentsCount = comments.length;

    const reviewsCount = reviews.length;

    const weightedAverageRating = averageRatingWeight * averageRating + commentsWeight * commentsCount + reviewsWeight * reviewsCount;

    this.user_rating = weightedAverageRating;

    await this.save();
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.getById = function (userId) {
  return this.findById(userId);
};

UserSchema.statics.getAll = function () {
  return this.find();
};

UserSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

UserSchema.methods.isActive = function () {
  return this.is_active;
};

UserSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

UserSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

UserSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

UserSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

UserSchema.statics.getById = function (id) {
  return this.findById(id);
};

UserSchema.statics.getAll = function () {
  return this.find();
};

UserSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

export default mongoose.model("User", UserSchema);
