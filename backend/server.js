require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = require('./src/app');
const connectDB = require('./config/db');
const seedDefaultUser = require('./src/seed/defaultUser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultUser();

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err?.message || err);
    process.exit(1);
  }
  app.use(cors({ origin: 'http://localhost:5173' }));
};

startServer();

