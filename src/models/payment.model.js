const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    package: {
        type: String,
        required: true,
      },
    uid:{
        type: mongoose.Types.ObjectId,
        required: true,
      },
    startDate:{
        type: Date,
        required: true,
    }
  }, 
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json



/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
