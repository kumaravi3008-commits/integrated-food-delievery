require('dotenv').config({ path: require('path').join(__dirname, '.env') });


const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();

