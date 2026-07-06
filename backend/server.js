require('dotenv').config({ path: require('path').join(__dirname, '.env') });

<<<<<<< HEAD
const http = require('http');
const app = require('./src/app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
console.log('JWT_SECRET =', process.env.JWT_SECRET || 'dev-secret');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const seedDefaultUser = require('./src/seed/defaultUser');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDefaultUser();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();

>>>>>>> 5b8d4cddc28bcea85d0dd37a2c8d886722be2797
