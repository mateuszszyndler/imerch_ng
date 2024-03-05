// FilterController.js
import Product from "../models/Product.js";

const filterController = {
  filterByName: async (name) => {
    return Product.find({ name: new RegExp(name, "i") });
  },

  filterByDescription: async (description) => {
    return Product.find({ description: new RegExp(description, "i") });
  },

  filterByDesignId: async (designId) => {
    return Product.find({ design_id: designId });
  },

  filterByPredefinedId: async (predefinedId) => {
    return Product.find({ predefined_id: predefinedId });
  },

  filterByComments: async (commentId) => {
    return Product.find({ comments: commentId });
  },

  filterByQuantity: async (min, max) => {
    return Product.find({ quantity: { $gte: min, $lte: max } });
  },

  filterByTax: async (min, max) => {
    return Product.find({ tax: { $gte: min, $lte: max } });
  },

  filterByDeletedAt: async (deletedAt) => {
    return Product.find({ deleted_at: deletedAt });
  },

  filterByIsActive: async (isActive) => {
    return Product.find({ is_active: isActive });
  },

  filterByVersion: async (version) => {
    return Product.find({ version: version });
  },

  filterByPreviewImages: async (image) => {
    return Product.find({ preview_images: image });
  },

  filterByBrand: async (storeId) => {
    return Product.find({ store_id: storeId });
  },

  filterBySize: async (sizes) => {
    return Product.find({ "sizes.size_id": { $in: sizes } });
  },

  filterByCategory: async (category) => {
    const query = Product.find();
    query.where("category").equals(category);
    return query.exec();
  },

  filterByType: async (types) => {
    const query = Product.find();
    query.where("type").in(types);
    return query.exec();
  },

  filterByColor: async (colors) => {
    const query = Product.find();
    query.where("colors").in(colors);
    return query.exec();
  },

  filterByPrice: async (min, max) => {
    const query = Product.find();
    query.where("price").gte(min).lte(max);
    return query.exec();
  },

  filterByAvailability: async (availability) => {
    return Product.find({ availability: availability });
  },

  filterByBestProducts: async (limit) => {
    return Product.getBestProducts(limit);
  },

  filterByLatestProducts: async (limit) => {
    return Product.getLatestProducts(limit);
  },

  filterProducts: async (req, res) => {
    try {
      const filters = req.body;

      let query = Product.find().applyFilters(filters);

      const filteredProducts = await query.exec();
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while filtering products" });
    }
  },

  filterByReviewRating: async (productId, minRating, maxRating) => {
    return Comment.aggregate([
      { $match: { product_id: mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$product_id",
          avgRating: { $avg: "$rating" },
        },
      },
      {
        $match: {
          avgRating: { $gte: minRating, $lte: maxRating },
        },
      },
    ]);
  },

  //... continue with other filters
};

export default filterController;
