const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', healthRoutes);

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

