require('dotenv').config();

const http = require('http');
const app = require('./src/app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

http.createServer(app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});