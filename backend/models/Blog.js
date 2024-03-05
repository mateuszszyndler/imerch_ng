import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
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
  { collection: "blogs", timestamps: true }
);

BlogSchema.statics.createOrUpdate = function (blogData) {
  if (blogData._id) {
    return this.findByIdAndUpdate(blogData._id, blogData, { new: true });
  } else {
    return this.create(blogData);
  }
};

BlogSchema.statics.getById = function (blogId) {
  return this.findById(blogId);
};

BlogSchema.statics.getAll = function () {
  return this.find();
};

BlogSchema.statics.getByField = function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

BlogSchema.statics.findBlogsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "inactive":
      return this.find({ is_active: false });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

BlogSchema.statics.countBlogs = function () {
  return this.countDocuments();
};

BlogSchema.methods.saveOrUpdate = function () {
  return this.save();
};

BlogSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

BlogSchema.methods.isActive = function () {
  return this.is_active;
};

BlogSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

BlogSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
