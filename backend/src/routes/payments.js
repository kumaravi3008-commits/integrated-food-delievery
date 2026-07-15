const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validateBodyZod');
const { paymentPaySchema } = require('../middleware/validators/paymentSchemas');
const { payOrderHandler } = require('../controllers/paymentsController');

const router = express.Router();

// Customer payment simulation
router.post('/payments/:orderId/pay', requireAuth, validateBody(paymentPaySchema), payOrderHandler);

module.exports = router;


