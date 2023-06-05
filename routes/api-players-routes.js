const express = require('express');
const router = express.Router();
const {getPlayers} = require('../controllers/api-players-controllers');

router.get('/api/players', getPlayers);

module.exports = router;