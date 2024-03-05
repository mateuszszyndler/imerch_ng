import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
    history: [
      {
        date: {
          type: Date,
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        precontent: {
          type: String,
          required: false,
        },
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
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
  },
  { collection: "comments", timestamps: true }
);

// Static methods
CommentSchema.statics.createOrUpdate = async function (commentData) {
  if (commentData._id) {
    const updatedComment = await this.findByIdAndUpdate(commentData._id, commentData, { new: true });
    return updatedComment;
  } else {
    const newComment = await this.create(commentData);
    return newComment;
  }
};

CommentSchema.statics.getById = async function (commentId) {
  return this.findById(commentId);
};

CommentSchema.statics.getAll = async function () {
  return this.find();
};

CommentSchema.statics.getByField = async function (field, value) {
  return this.find({ [field]: value });
};

CommentSchema.statics.countComments = async function () {
  return this.countDocuments();
};

CommentSchema.statics.findCommentsByStatus = async function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

// Instance methods
CommentSchema.methods.saveOrUpdate = async function () {
  return this.save();
};

CommentSchema.methods.softDeleteOrRestore = async function () {
  if (this.deleted_at === null) {
    this.deleted_at = new Date();
  } else {
    this.deleted_at = null;
  }
  return this.save();
};

CommentSchema.methods.isActive = function () {
  return this.is_active;
};

CommentSchema.methods.activate = async function () {
  this.is_active = true;
  return this.save();
};

CommentSchema.methods.deactivate = async function () {
  this.is_active = false;
  return this.save();
};

CommentSchema.methods.restore = async function () {
  this.deleted_at = null;
  return this.save();
};

CommentSchema.methods.softDelete = async function () {
  this.deleted_at = new Date();
  return this.save();
};

CommentSchema.methods.getProduct = function () {
  return mongoose.model("Product").findById(this.product_id);
};

CommentSchema.methods.getUser = function () {
  return mongoose.model("User").findById(this.user_id);
};

CommentSchema.methods.addLike = async function () {
  this.likes++;
  return this.save();
};

CommentSchema.methods.removeLike = async function () {
  if (this.likes > 0) {
    this.likes--;
  }
  return this.save();
};

CommentSchema.methods.addShare = async function () {
  this.shares++;
  return this.save();
};

CommentSchema.methods.removeShare = async function () {
  if (this.shares > 0) {
    this.shares--;
  }
  return this.save();
};

CommentSchema.methods.addHistory = async function (action, content, precontent) {
  const historyEntry = {
    date: new Date(),
    action,
    content,
    precontent,
    user_id: this.user_id,
  };
  this.history.push(historyEntry);
  return this.save();
};

CommentSchema.statics.getTopRated = async function () {
  return this.find().sort({ rating: -1, likes: -1 }).limit(4);
};

CommentSchema.methods.getHistory = function () {
  return this.history;
};

// Query methods
CommentSchema.query.applyFilters = function (filters) {
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

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
