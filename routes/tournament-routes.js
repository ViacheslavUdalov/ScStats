const express = require('express');
const router = express.Router();
const {
    getTournaments,
    deleteTournament,
    getTournament,
    getAddTournament,
    addTournament,
    getEditTournament,
    editTournament } = require('../controllers/api-tournament-controller')
router.get('/tournaments', getTournaments);
router.get('/tournaments/:id', getTournament);
router.delete('/tournaments/:id', deleteTournament);
router.get('/add-tournament', getAddTournament);
router.post('/add-tournament', addTournament);
router.get('/edit/:id', getEditTournament);
router.put('/edit/:id', editTournament);
module.exports = router;