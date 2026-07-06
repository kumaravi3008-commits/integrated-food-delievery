const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  console.log('DB URI:', mongoUri);

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected ✔');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = connectDB;

