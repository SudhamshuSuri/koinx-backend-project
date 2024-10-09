const mongoose = require('mongoose');

// Define the schema for cryptocurrency data
const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['BTC', 'ETH', 'MATIC'],
  },
  symbol: {
    type: String,
    required: true,
    enum: ['btc', 'eth', 'matic'],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  historicalPrices: [
    {
      price: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Create a model based on the schema
const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

