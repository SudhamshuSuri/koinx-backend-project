const mongoose = require('mongoose'); const Crypto = require('./Crypto'); // Assuming you save the schema in a 'models' folder Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cryptoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Example function to save a new cryptocurrency record
async function saveCryptoData() {
  try {
    const newCrypto = new Crypto({
      name: 'BTC',
      symbol: 'btc',
      price: 35000,
      marketCap: 700000000,
      change24h: -1.2,
    });
    await newCrypto.save();
    console.log('Crypto data saved successfully');
  } catch (error) {
    console.error('Error saving crypto data:', error);
  }
}

// Run the function
saveCryptoData();

