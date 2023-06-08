const express = require('express');
const router = express.Router();
const handleValidationErrors = require('../utilits/handeValidationErrors')
const {tournamentValidation} = require('../validations/auth');
const checkAuth  = require("../utilits/checkAuth");

const {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament}
    = require('../controllers/api-tournament-controller')
router.get('/tournaments', getTournaments);
router.get('/tournaments/:id', getTournament);
router.delete('/tournaments/:id', checkAuth, deleteTournament);
router.post('/tournaments', checkAuth, tournamentValidation, handleValidationErrors, addTournament);
router.patch('/tournaments/:id', checkAuth, tournamentValidation, handleValidationErrors, editTournament);

module.exports = router;