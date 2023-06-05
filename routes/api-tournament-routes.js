const express = require('express');
const router = express.Router();
const {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament } = require('../controllers/api-tournament-controller')
router.get('/api/tournaments', getTournaments);
router.get('/api/tournaments/:id', getTournament);
router.delete('/api/tournaments/:id', deleteTournament);
router.post('/api/tournaments', addTournament);
router.put('/api/tournaments/:id', editTournament);
module.exports = router;