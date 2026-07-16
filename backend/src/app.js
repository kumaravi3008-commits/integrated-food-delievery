const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const restaurantsRoutes = require('./routes/restaurants');
const menusRoutes = require('./routes/menus');
const ordersRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth');
const paymentsRoutes = require('./routes/payments');
const reviewsRoutes = require('./routes/reviews');
const reviewSuggestionsRoutes = require('./routes/reviewSuggestions');

const { helmetMiddleware } = require('./middleware/helmetConfig');
const { apiRateLimiter } = require('./middleware/apiRateLimiter');
const { corsOriginResolver } = require('./middleware/securityConfig');

const app = express();


// Middlewares
app.use(express.json());


// Security middleware
app.use(helmetMiddleware());

app.use(
  cors({
    origin: corsOriginResolver,
    credentials: true,
  })
);

// Apply rate limiting to all API endpoints
app.use('/api', apiRateLimiter());

// Routes
app.use('/api', healthRoutes);
app.use('/api', restaurantsRoutes);
app.use('/api', menusRoutes);
app.use('/api', ordersRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', authRoutes);
app.use('/api', paymentsRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', reviewSuggestionsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err?.statusCode || err?.status || 500;
  const message = statusCode === 400 && err ? err?.message : err?.message || 'Internal Server Error';

  // Hide stack traces in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({ success: false, message: message || 'Internal Server Error' });
  }

  // Development: still keep response consistent; do not leak internal details other than message
  return res.status(statusCode).json({ success: false, message: message || 'Internal Server Error' });
});

module.exports = app;


