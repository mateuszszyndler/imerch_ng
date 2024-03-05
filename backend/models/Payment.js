import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiUrl: {
      type: String,
      required: true,
    },
    // Przelewy24-specific fields
    p24_merchant_id: {
      type: String,
      required: function () {
        return this.name === "Przelewy24";
      },
    },
    p24_pos_id: {
      type: String,
      required: function () {
        return this.name === "Przelewy24";
      },
    },
    p24_crc: {
      type: String,
      required: function () {
        return this.name === "Przelewy24";
      },
    },
    // Stripe-specific fields
    stripe_secret_key: {
      type: String,
      required: function () {
        return this.name === "Stripe";
      },
    },
    stripe_publishable_key: {
      type: String,
      required: function () {
        return this.name === "Stripe";
      },
    },
    // PayPal-specific fields
    paypal_client_id: {
      type: String,
      required: function () {
        return this.name === "PayPal";
      },
    },
    paypal_client_secret: {
      type: String,
      required: function () {
        return this.name === "PayPal";
      },
    },
    // Credit Card-specific fields
    card_payment_gateway_username: {
      type: String,
      required: function () {
        return this.name === "Credit Card";
      },
    },
    card_payment_gateway_password: {
      type: String,
      required: function () {
        return this.name === "Credit Card";
      },
    },
    card_payment_gateway_url: {
      type: String,
      required: function () {
        return this.name === "Credit Card";
      },
    },
    // ... add more fields as needed for other payment providers
  },
  { collection: "payment_providers" }
);

PaymentSchema.statics.createPayment = function (paymentData) {
  return this.create(paymentData);
};

PaymentSchema.statics.getPayment = function (paymentId) {
  return this.findById(paymentId);
};

PaymentSchema.statics.updatePayment = function (paymentId, updatedData) {
  return this.findByIdAndUpdate(paymentId, updatedData, { new: true });
};

PaymentSchema.statics.deletePayment = function (paymentId) {
  return this.findByIdAndRemove(paymentId);
};

PaymentSchema.statics.findActivePayments = function () {
  return this.find({ is_active: true });
};

PaymentSchema.statics.findInactivePayments = function () {
  return this.find({ is_active: false });
};

PaymentSchema.statics.findDeletedPayments = function () {
  return this.find({ deleted_at: { $ne: null } });
};

PaymentSchema.statics.restorePayment = function (paymentId) {
  return this.findByIdAndUpdate(paymentId, { deleted_at: null });
};

PaymentSchema.statics.countPayments = function () {
  return this.countDocuments();
};

PaymentSchema.methods.savePayment = function () {
  return this.save();
};

PaymentSchema.methods.update = function (paymentData) {
  Object.assign(this, paymentData);
  return this.save();
};

PaymentSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

PaymentSchema.methods.isActive = function () {
  return this.is_active;
};

PaymentSchema.methods.activate = function () {
  this.is_active = true;
  return this.save();
};

PaymentSchema.methods.deactivate = function () {
  this.is_active = false;
  return this.save();
};

PaymentSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

PaymentSchema.query.applyFilters = function (filters) {
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

PaymentSchema.statics.findPaymentsByStatus = function (status) {
  switch (status) {
    case "active":
      return this.find({ is_active: true });
    case "deleted":
      return this.find({ deleted_at: { $ne: null } });
    default:
      return [];
  }
};

PaymentSchema.statics.getById = function (paymentId) {
  return this.findById(paymentId);
};

PaymentSchema.statics.getAll = function () {
  return this.find();
};

PaymentSchema.statics.getByField = function (field, value) {
  return this.find({ [field]: value });
};

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
