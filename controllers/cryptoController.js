const Crypto = require('../models/Crypto');

// Get statistics for all cryptocurrencies
exports.getStats = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

// Compute standard deviation for BTC price
exports.getDeviation = async (req, res) => {
  try {
    const btcPrices = await Crypto.find({ symbol: 'btc' }, 'price');
    const prices = btcPrices.map(item => item.price);

    // Standard deviation logic
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: stdDeviation });
  } catch (error) {
    res.status(500).json({ error: 'Error computing deviation' });
  }
};

