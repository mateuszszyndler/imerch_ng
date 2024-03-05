import mongoose, { Schema } from "mongoose";
import PDFDocument from "pdfkit";

const OrderSchema = new Schema(
  {
    order_number: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        images: [String],
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        color: String,
        size: String,
        type: String,
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    notes: {
      type: Schema.Types.Mixed,
    },
    total_price: {
      type: Number,
      required: true,
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
        state: {
          type: String,
          required: true,
        },
        country: {
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
    payment: {
      transaction_id: {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      payment_method: {
        type: String,
        required: true,
      },
      transaction_status: {
        type: String,
        required: true,
      },
    },
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
    invoice: [
      {
        invoice_number: {
          type: String,
          required: true,
        },
        payment_due_date: {
          type: Date,
          required: true,
        },
        notes: String,
        deleted_at: Date,
        is_active: {
          type: Boolean,
          default: true,
        },
        version: {
          type: Number,
          default: 0,
        },
        invoice_document: Buffer,
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "shipped", "delivered"],
    },
    order_history: [
      {
        status: {
          type: String,
          required: true,
        },
        notes: String,
        updated_at: {
          type: Date,
          required: true,
        },
      },
    ],
    promotion_codes: [String],
    refunds: [
      {
        refund_id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        refund_status: {
          type: String,
          required: true,
        },
        refund_reason: {
          type: String,
          required: true,
        },
        refund_address: {
          type: String,
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
      default: 0,
    },
  },
  { collection: "orders", timestamps: true }
);

OrderSchema.methods.generateOrderNumber = async function () {
  const country = await mongoose.model("Country").findById(this.delivery_address.country_id);
  const state = await mongoose.model("State").findById(this.delivery_address.state_id);
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const autoIncreaseNumber = (await this.constructor.countDocuments()) + 1;
  const countryCode = country.code;
  const stateCode = state.code;
  const shortDate = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}/${year}`;
  this.order_number = `${countryCode}-${stateCode}-${autoIncreaseNumber}-${shortDate}`;
  return this.save();
};

OrderSchema.statics.findOrdersByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

OrderSchema.methods.generateInvoiceDocument = async function () {
  const doc = new PDFDocument();

  doc.text(`Invoice Number: ${this.order_number}`);
  doc.text(`Order ID: ${this.order_id}`);
  doc.text(`User ID: ${this.user_id}`);

  doc.text("Payment Details:");
  doc.text(`Transaction ID: ${this.payment.transaction_id}`);
  doc.text(`Amount: ${this.payment.amount}`);
  doc.text(`Currency: ${this.payment.currency}`);
  doc.text(`Payment Method: ${this.payment.payment_method}`);
  doc.text(`Payment Status: ${this.payment.transaction_status}`);

  doc.text("Items:");
  this.products.forEach((item, index) => {
    doc.text(`Item ${index + 1}:`);
    doc.text(`Product ID: ${item.product_id}`);
    doc.text(`Name: ${item.name}`);
    doc.text(`Quantity: ${item.quantity}`);
    doc.text(`Price: ${item.price}`);
    doc.text("Discounts:");
    item.discounts.forEach((discount) => {
      doc.text(discount);
    });
  });

  doc.text(`Total Price: ${this.total_price}`);

  doc.text("Delivery Address:");
  doc.text(`Name: ${this.delivery_address.address_name}`);
  doc.text(`Street: ${this.delivery_address.address_line_1}`);
  doc.text(`City: ${this.delivery_address.city}`);
  doc.text(`Postal Code: ${this.delivery_address.zip_code}`);
  doc.text(`State: ${this.delivery_address.state}`);
  doc.text(`Country ID: ${this.delivery_address.country}`);
  doc.text(`Phone Number: ${this.delivery_address.phone_number}`);

  doc.text(`Status: ${this.status}`);
  doc.text(`Payment Due Date: ${this.invoice.payment_due_date}`);

  doc.text(`Notes: ${this.notes}`);

  const buffers = [];
  doc.on("data", (buffer) => buffers.push(buffer));
  doc.end();

  return Buffer.concat(buffers);
};

OrderSchema.methods.getInvoiceDocument = function () {
  return this.invoice_document;
};

OrderSchema.statics.createOrUpdate = function (orderData) {
  if (orderData._id) {
    return this.findByIdAndUpdate(orderData._id, orderData, { new: true });
  } else {
    return this.create(orderData);
  }
};

OrderSchema.methods.saveOrUpdate = function () {
  return this.save();
};

OrderSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

OrderSchema.methods.isActive = function () {
  return this.is_active;
};

OrderSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

OrderSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

OrderSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

OrderSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

OrderSchema.statics.getById = function (orderId) {
  return this.findById(orderId);
};

OrderSchema.statics.getAll = function () {
  return this.find();
};

OrderSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

OrderSchema.query.applyFilters = function (filters) {
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

const Order = mongoose.model("Order", OrderSchema);

export default Order;
