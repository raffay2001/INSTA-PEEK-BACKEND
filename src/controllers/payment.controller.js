const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');




const test = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send('abc');
  });

  module.exports = {
    test
  };
  