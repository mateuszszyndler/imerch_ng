import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    images: [String],
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: String,
    size: String,
    type: String,
    tax: Number,
    discount: Number,
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    session_id: {
      type: String,
    },
    items: [CartItemSchema],
    subtotal: Number,
    tax: Number,
    discount: Number,
    coupon: String,
    payment_fee: Number,
    total_price: Number,
    deleted_at: Date,
    is_active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["new", "pending", "paid", "failed", "cancelled", "refunded", "completed"],
    },
    version: {
      type: Number,
      default: 1,
    },
    currency: String,
    notes: String,
    is_empty: {
      type: Boolean,
      default: true,
    },
    discounts_applied: [
      {
        discount_amount: Number,
        description: String,
      },
    ],
    delivery: {
      shipping_id: {
        type: Schema.Types.ObjectId,
        ref: "Shipping",
        required: true,
      },
      tracking_number: {
        type: String,
        required: true,
      },
      delivery_time: {
        type: String,
        required: true,
      },
      delivery_cost: {
        type: Number,
        required: true,
      },
      delivery_status: {
        type: String,
        required: true,
        enum: ["pending", "shipped", "delivered"],
      },
    },
    delivery_address: [
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
    billing_address: {
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
    billing_same_as_shipping: Boolean,
    payment_method: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    additional_fields: Schema.Types.Mixed,
  },
  { collection: "cart", timestamps: true }
);

CartSchema.statics.createOrUpdate = function (cartData) {
  const cartId = cartData._id;
  if (cartId) {
    return this.findByIdAndUpdate(cartId, cartData, { new: true });
  } else {
    return this.create(cartData);
  }
};

CartSchema.statics.getById = function (cartId) {
  return this.findById(cartId);
};

CartSchema.statics.getAll = function () {
  return this.find();
};

CartSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

CartSchema.statics.findActiveByStatus = function (status) {
  return this.find({ is_active: true, status });
};

CartSchema.statics.findInactiveByStatus = function (status) {
  return this.find({ is_active: false, status });
};

CartSchema.statics.findDeletedByStatus = function (status) {
  return this.find({ deleted_at: { $ne: null }, status });
};

CartSchema.statics.restore = function (cartId) {
  return this.findByIdAndUpdate(cartId, { deleted_at: null });
};

CartSchema.methods.saveOrUpdate = function () {
  return this.save();
};

CartSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

CartSchema.methods.isActive = function () {
  return this.is_active;
};

CartSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

CartSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

CartSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

CartSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

CartSchema.methods.addItem = function (itemData) {
  this.items.push(itemData);
  this.is_empty = false;
  return this.save();
};

CartSchema.methods.removeItem = function (itemId) {
  this.items = this.items.filter((item) => item._id.toString() !== itemId);
  if (this.items.length === 0) {
    this.is_empty = true;
  }
  return this.save();
};

CartSchema.methods.updateItem = function (itemId, updatedItemData) {
  const item = this.items.find((item) => item._id.toString() === itemId);
  if (item) {
    Object.assign(item, updatedItemData);
    return this.save();
  }
  return Promise.reject(new Error("Item not found"));
};

CartSchema.methods.applyDiscount = function (discountData) {
  this.discounts_applied.push(discountData);
  return this.save();
};

CartSchema.methods.removeDiscount = function (discountId) {
  this.discounts_applied = this.discounts_applied.filter((discount) => discount.discount_id.toString() !== discountId);
  return this.save();
};

CartSchema.methods.calculateTotal = async function () {
  const subtotal = this.items.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    return total + itemPrice;
  }, 0);

  const totalTax = subtotal * (this.tax / 100);
  const totalDiscount = subtotal * (this.discount / 100);
  const totalDeliveryPrice = this.delivery_price || 0;
  const totalPaymentFee = this.payment_fee || 0;

  const total = subtotal + totalTax - totalDiscount + totalDeliveryPrice + totalPaymentFee;

  this.subtotal = subtotal;
  this.tax = totalTax;
  this.discount = totalDiscount;
  this.total_price = total;

  return this.save();
};

CartSchema.methods.markAsEmpty = function () {
  this.items = [];
  this.is_empty = true;
  return this.save();
};

CartSchema.methods.setShippingAddress = function (addressData) {
  this.shipping_address = addressData;
  return this.save();
};

CartSchema.methods.setBillingAddress = function (addressData) {
  this.billing_address = addressData;
  return this.save();
};

CartSchema.methods.setBillingSameAsShipping = function (isSame) {
  this.billing_same_as_shipping = isSame;
  return this.save();
};

CartSchema.methods.setPaymentMethod = function (paymentMethod) {
  this.payment_method = paymentMethod;
  return this.save();
};

CartSchema.query.applyFilters = function (filters) {
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

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
