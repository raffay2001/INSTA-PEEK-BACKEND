const httpStatus = require('http-status');
const PaymentModel = require('../models/payment.model');
const { User } = require('../models');
const mongoose = require('mongoose');

const stripe = require('stripe')('sk_test_51Lj1VASGZP3p3zAF1bWp5RFnID7qsSAN5UG2gVvYvvxNJc8E4WUnycQlszjMCnv3JegKYNWTLJ6aZ8rJX2lYfX3d00JIv0Ji9W');

const test = async (text) => {
  return {
    test: text
  }
};

const subscribe = async (_id, amount, package, email, startDate, subId) => {
  try {
    const id = mongoose.Types.ObjectId(_id)
    console.log(id, 'iddd', typeof id)
    await PaymentModel.create({ uid: id, amount, package, email, startDate })
    await User.findOneAndUpdate({ _id: id }, { subId: subId, package, subStartDate: startDate });
    const user = await User.findOne({ _id: id })
    return {
      success: true,
      message: 'Subscription Successful',
      data: user
    }
  } catch (e) {
    return {
      success: false,
      status: 300,
      messasge: 'Something went wrong',
      data: null,
      exception: e.message
    }
  }

};

const createIntent = async (name, email,package) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    // price_1N2XyNSGZP3p3zAFQ3WfA6Om
    let priceId;
    if (package.toLowerCase() === 'personal') {
      priceId='price_1N2f9hSGZP3p3zAFU46hl7Qe';
    } else if (package.toLowerCase() === 'starter') {
      priceId='price_1N2f9ISGZP3p3zAFlC2qb4Gy';
    } else if (package.toLowerCase() === 'pro') {
      priceId='price_1N2f8SSGZP3p3zAFer9ycyjb';
    }
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        // price: 'price_1Myqn6SGZP3p3zAFDYmVEXCu',
        price: priceId 
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    return {
      success: true,
      message: 'Subscription Intent Successfully Created',
      data: {
        id: subscription.id,
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
      },
    };
  } catch (e) {
    return {
      success: false,
      status: 300,
      messasge: 'Something went wrong',
      data: null,
      exception: e.message
    }   
  }

 
};



const unsubscribe = async (subId) => {
  try {
    const deletedSubscription = await stripe.subscriptions.del(
      subId
    );
    return {
      success: true,
      data: data,
      message: "Unsubscribed successfully",
      status: 200
    }
  } catch (error) {
    return {
      success: false,
      status: 300,
      messasge: 'Something went wrong',
      data: null,
      exception: e.message
    }
  }

}




module.exports = {
  test,
  subscribe,
  createIntent,
  unsubscribe
};