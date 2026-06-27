const express = require('express');

const { createCheckoutHandler } = require('../controllers/checkoutController');

const router = express.Router();

router.post('/checkout', createCheckoutHandler);

module.exports = router;

