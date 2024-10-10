const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const cryptoRoutes = require('./routes/cryptoRoutes');

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

