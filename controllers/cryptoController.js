const Crypto = require('../models/Crypto');

// Get all cryptocurrencies
exports.getAllCryptocurrencies = async (req, res) => {
  try {
    const cryptocurrencies = await Crypto.find();
    res.json(cryptocurrencies);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cryptocurrencies' });
  }
};

// Get a specific cryptocurrency by ID
exports.getCryptocurrencyById = async (req, res) => {
  try {
    const cryptocurrency = await Crypto.findById(req.params.id);
    if (!cryptocurrency) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }
    res.json(cryptocurrency);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cryptocurrency' });
  }
};

// Create a new cryptocurrency
exports.createCryptocurrency = async (req, res) => {
  try {
    const { name, symbol, marketCap } = req.body;
    if (!name || !symbol || !marketCap) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newCrypto = new Crypto({ name, symbol, marketCap });
    await newCrypto.save();
    res.status(201).json(newCrypto);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cryptocurrency' });
  }
};

// Update a cryptocurrency
exports.updateCryptocurrency = async (req, res) => {
  try {
    const { name, symbol, marketCap } = req.body;
    if (!name || !symbol || !marketCap) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const updatedCrypto = await Crypto.findByIdAndUpdate(
      req.params.id,
      { name, symbol, marketCap },
      { new: true }
    );
    if (!updatedCrypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }
    res.json(updatedCrypto);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cryptocurrency' });
  }
};

// Delete a cryptocurrency
exports.deleteCryptocurrency = async (req, res) => {
  try {
    const deletedCrypto = await Crypto.findByIdAndDelete(req.params.id);
    if (!deletedCrypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }
    res.json({ message: 'Cryptocurrency deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cryptocurrency' });
  }
};
