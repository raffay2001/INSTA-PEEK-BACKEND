const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payment.controller');


router
  .route('/test')
  .get(paymentController.test)

router.route('/createIntent').post(paymentController)

module.exports = router;