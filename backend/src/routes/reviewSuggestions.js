const express = require('express');

const { requireAuth } = require('../middleware/authMiddleware');
const { getSuggestionsHandler } = require('../controllers/reviewSuggestionController');

const router = express.Router();

router.get('/reviews/suggestions/:orderId', requireAuth, getSuggestionsHandler);

module.exports = router;

