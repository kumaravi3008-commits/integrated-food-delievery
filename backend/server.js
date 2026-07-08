require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const http = require('http');

console.log('JWT_SECRET =', process.env.JWT_SECRET || 'dev-secret');

const app = require('./src/app');
const connectDB = require('./src/config/db');
const seedDefaultUser = require('./src/seed/defaultUser');
const { initSocket } = require('./src/socket');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultUser();

    // Attach Socket.IO to the same HTTP server
    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err?.message || err);
    process.exit(1);
  }
};

startServer();