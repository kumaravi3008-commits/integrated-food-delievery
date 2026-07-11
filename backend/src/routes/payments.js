const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');
const { payOrderHandler } = require('../controllers/paymentsController');

const router = express.Router();

// Customer payment simulation
router.post('/payments/:orderId/pay', requireAuth, payOrderHandler);

module.exports = router;

