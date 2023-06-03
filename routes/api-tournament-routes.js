const express = require('express');
const router = express.Router();
const {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament } = require('../controllers/api-tournament-controller')
router.get('/api/tournaments', getTournaments);
router.get('/api/tournament/:id', getTournament);
router.delete('/api/tournament/:id', deleteTournament);
router.post('/api/tournament', addTournament);
router.put('/api/tournament/:id', editTournament);
module.exports = router;