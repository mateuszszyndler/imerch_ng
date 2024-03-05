import mongoose, { Schema } from "mongoose";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

const currentModuleUrl = import.meta.url;
const currentModulePath = dirname(fileURLToPath(currentModuleUrl));
const receiptTemplatePath = path.join(currentModulePath, "..", "helpers", "receiptTemplate.hbs");

const receiptTemplate = fs.readFileSync(receiptTemplatePath, "utf8");
const template = Handlebars.compile(receiptTemplate);

const TransactionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
    payout_id: {
      type: Schema.Types.ObjectId,
      ref: "Payout",
      required: false,
    },
    store_id: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: false,
    },
    transaction_amount: {
      type: Number,
      required: true,
    },
    transaction_currency: {
      type: String,
      required: true,
    },
    transaction_fee: {
      type: Number,
      required: false,
    },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
    transaction_status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["merch", "order", "payout", "refund", "subscription"],
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_provider: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    provider_transaction_id: {
      type: String,
      required: true,
    },
    receipt: {
      type: Buffer,
      required: false,
    },
    p24_token: String,
    p24_seller_id: String,
    paypal_order_id: String,
    paypal_payer_id: String,
    stripe_charge_id: String,
    stripe_customer_id: String,
    card_type: String,
    cardholder_name: String,
    card_number: String,
    card_expiry_date: String,
    card_security_code: String,
    deleted_at: Date,
    is_active: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    timestamps: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "transactions", timestamps: true }
);

TransactionSchema.methods.updateTransactionFee = async function (transaction_fee) {
  try {
    this.transaction_fee = transaction_fee;
    const updatedPayment = await this.save();
    console.log(`Transaction document updated with ID: ${updatedPayment._id}`);
    return updatedPayment;
  } catch (error) {
    console.error("Error updating transaction fee:", error);
    throw error;
  }
};

TransactionSchema.methods.isPaymentSuccessful = function () {
  return this.status === "approved" || this.status === "completed";
};

TransactionSchema.methods.generateReceipt = function () {
  const paymentId = this._id;
  const orderId = this.order_id;
  const amountPaid = this.transaction_amount;
  const currency = this.transaction_currency;
  const data = {
    paymentId,
    orderId,
    amountPaid,
    currency,
  };
  const receiptContent = template(data);
  return receiptContent;
};

TransactionSchema.statics.createOrUpdate = function (transactionData) {
  if (transactionData._id) {
    const transactionId = transactionData._id;
    delete transactionData._id;
    return this.findByIdAndUpdate(transactionId, transactionData, {
      new: true,
    });
  } else {
    return this.create(transactionData);
  }
};

TransactionSchema.statics.getById = function (transactionId) {
  return this.findById(transactionId);
};

TransactionSchema.statics.getAll = function () {
  return this.find();
};

TransactionSchema.statics.getByField = function (field, value) {
  const query = {};
  query[field] = value;
  return this.find(query);
};

TransactionSchema.statics.findActiveTransactions = function () {
  return this.find({ is_active: true });
};

TransactionSchema.statics.findInactiveTransactions = function () {
  return this.find({ is_active: false });
};

TransactionSchema.statics.findDeletedTransactions = function () {
  return this.find({ deleted_at: { $ne: null } });
};

TransactionSchema.statics.restoreTransaction = function (transactionId) {
  return this.findByIdAndUpdate(transactionId, { deleted_at: null });
};

TransactionSchema.statics.countTransactions = function () {
  return this.countDocuments();
};

TransactionSchema.methods.saveOrUpdate = function () {
  return this.save();
};

TransactionSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
  } else {
    this.deleted_at = new Date();
  }
  return this.save();
};

TransactionSchema.methods.isActive = function () {
  return this.is_active;
};

TransactionSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

TransactionSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

TransactionSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

TransactionSchema.statics.findTransactionsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

TransactionSchema.query.applyFilters = function (filters) {
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

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
