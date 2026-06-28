const express = require('express');

const { createCheckoutHandler } = require('../controllers/checkoutController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkout', requireAuth, createCheckoutHandler);

module.exports = router;


