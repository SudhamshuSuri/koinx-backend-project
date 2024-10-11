const express = require('express');
const router = express.Router();
const cryptoController = require('./controllers/cryptoController');

// Get all cryptocurrencies
router.get('/', cryptoController.getAllCryptocurrencies);

// Get a specific cryptocurrency by ID
router.get('/:id', cryptoController.getCryptocurrencyById);

// Create a new cryptocurrency
router.post('/', cryptoController.createCryptocurrency);

// Update a cryptocurrency
router.put('/:id', cryptoController.updateCryptocurrency);

// Delete a cryptocurrency
router.delete('/:id', cryptoController.deleteCryptocurrency);

module.exports = router;



const cron = require('./cron');

// Start the cron job
