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



const app = express();



// Middlewares

app.use(express.json());
app.use(cors());

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


// 404



app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Keep it simple for Day 1
  res.status(500).json({ success: false, message: err?.message || 'Internal Server Error' });
});

module.exports = app;

