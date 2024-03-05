import mongoose, { Schema } from "mongoose";

const PayoutSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    transaction_id: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed"],
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
    payer_name: {
      type: String,
      required: true,
    },
    payer_email: {
      type: String,
      required: true,
    },
    payee_name: {
      type: String,
      required: true,
    },
    payee_email: {
      type: String,
      required: true,
    },
    payee_bank_account: {
      type: String,
      required: true,
    },
    transaction_reference: {
      type: String,
      required: true,
    },
    payment_gateway_reference: {
      type: String,
      required: true,
    },
    fee_amount: {
      type: Number,
      required: true,
    },
    fee_currency: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  { collection: "payouts", timestamps: true }
);

PayoutSchema.statics.createOrUpdate = function (payoutData) {
  return this.findOneAndUpdate({ _id: payoutData._id }, payoutData, { upsert: true, new: true });
};

PayoutSchema.statics.getById = function (payoutId) {
  return this.findById(payoutId);
};

PayoutSchema.statics.getAll = function () {
  return this.find();
};

PayoutSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

PayoutSchema.statics.findPayoutsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

PayoutSchema.statics.findPayoutsByPartnerId = function (partnerId) {
  return this.find({ partner_id: partnerId });
};

PayoutSchema.statics.findPayoutsByAmount = function (amount) {
  return this.find({ amount: amount });
};

PayoutSchema.statics.findPayoutsByCurrency = function (currency) {
  return this.find({ currency: currency });
};

PayoutSchema.statics.findPayoutsByPaymentType = function (paymentType) {
  return this.find({ payment_type: paymentType });
};

PayoutSchema.statics.findPayoutsByPayerEmail = function (email) {
  return this.find({ payer_email: email });
};

PayoutSchema.statics.findPayoutsByPayeeEmail = function (email) {
  return this.find({ payee_email: email });
};

PayoutSchema.statics.findPayoutsByTransactionReference = function (reference) {
  return this.find({ transaction_reference: reference });
};

PayoutSchema.statics.findPayoutsByPaymentGatewayReference = function (reference) {
  return this.find({ payment_gateway_reference: reference });
};

PayoutSchema.statics.findPayoutsByMetadataField = function (field, value) {
  return this.find({ [`metadata.${field}`]: value });
};

PayoutSchema.statics.countPayouts = function () {
  return this.countDocuments();
};

PayoutSchema.methods.saveOrUpdate = function () {
  return this.save();
};

PayoutSchema.methods.softDeleteOrRestore = function () {
  if (this.deleted_at) {
    this.deleted_at = null;
    this.is_active = true;
  } else {
    this.deleted_at = new Date();
    this.is_active = false;
  }
  return this.save();
};

PayoutSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  this.is_active = false;
  return this.save();
};

PayoutSchema.methods.isActive = function () {
  return this.is_active;
};

PayoutSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

PayoutSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

PayoutSchema.methods.restore = function () {
  this.deleted_at = null;
  this.is_active = true;
  return this.save();
};

PayoutSchema.query.applyFilters = function (filters) {
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

const Payout = mongoose.model("Payout", PayoutSchema);

export default Payout;
