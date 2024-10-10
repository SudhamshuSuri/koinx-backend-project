const axios = require('axios');
const Crypto = require('../models/Crypto');

// Function to fetch and save BTC data from CoinGecko
exports.updateBTCData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });

    const btcData = response.data.bitcoin;

    // Create a new record or update the existing BTC record
    const btc = await Crypto.findOneAndUpdate(
      { symbol: 'btc' },
      {
        name: 'BTC',
        symbol: 'btc',
        price: btcData.usd,
        marketCap: btcData.usd_market_cap,
        change24h: btcData.usd_24h_change,
        $push: {
          historicalPrices: { price: btcData.usd, timestamp: new Date() }
        }
      },
      { upsert: true, new: true }
    );

    console.log('BTC data updated successfully:', btc);
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
  }
};

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
    const btcPrices = await Crypto.find({ symbol: 'btc' }, 'historicalPrices.price');
    const prices = btcPrices.flatMap(item => item.historicalPrices.map(record => record.price));

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({ deviation: stdDeviation });
  } catch (error) {
    res.status(500).json({ error: 'Error computing deviation' });
  }
};

