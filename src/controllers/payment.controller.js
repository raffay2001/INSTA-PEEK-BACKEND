const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { authService, userService, tokenService, emailService, paymentService } = require('../services');



const test = catchAsync(async (req, res) => {
  const data = await paymentService.test('xyzabc')
  res.status(httpStatus.OK).send(data);
});

const subscribe = catchAsync(async (req, res) => {
  const {_id, amount, package, email, subId} = req.body
  const date = new Date()
  const data = await paymentService.subscribe(_id, amount, package, email, date, subId)
  res.status(httpStatus.OK).send(data);
});


const createIntent = catchAsync(async (req, res) => {
  const {name, email, package} = req.body
  const data = await paymentService.createIntent(name, email, package)
  res.status(httpStatus.OK).send(data);
});


const unSubscribe = catchAsync(async (req, res) => {
  const {subId} = req.body

  const data = await paymentService.unsubscribe(subId)
  res.status(httpStatus.OK).send(data);
});

module.exports = {
  test,
  subscribe,
  createIntent,
  unSubscribe
};
