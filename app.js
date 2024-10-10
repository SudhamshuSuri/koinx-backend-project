const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const cryptoRoutes = require('./routes/cryptoRoutes');
const cryptoController = require('./controllers/cryptoController');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/crypto', cryptoRoutes);

// Cron job to update BTC data every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Fetching and updating BTC data...');
  await cryptoController.updateBTCData();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

