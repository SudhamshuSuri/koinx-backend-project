const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

// Route to get statistics about cryptocurrencies
router.get('/stats', cryptoController.getStats);

// Route to compute standard deviation for BTC price
router.get('/deviation', cryptoController.getDeviation);

module.exports = router;

