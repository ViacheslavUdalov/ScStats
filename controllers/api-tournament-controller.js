const Tournament = require("../models/tournament");
const handleError = (res, err) => {
    res.status(500).send(err.message)
}
const getTournaments = (req, res) => {
    Tournament
        .find()
        .sort({createdAt: -1})
        .then((tournaments) => res.status(200).json(tournaments))
        .catch((err) => handleError(res, err));
};
const getTournament = (req, res) => {
    Tournament
        .findById(req.params.id)
        .then((tournament) => res.status(200).json(tournament))
        .catch((err) => handleError(res, err));
}
const deleteTournament = (req, res) => {
    Tournament
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((err) => handleError(res, err));
}
const addTournament = (req, res) => {
    const {Name, players, about} = req.body;
    const tournament = new Tournament({Name, players, about});
    tournament
        .save()
        .then((tournament) => res.status(200).json(tournament))
        .catch((err) => handleError(res, err));
};
const editTournament = (req, res) => {
    const {Name, players, about} = req.body;
    const {id} = req.params;
    Tournament
        .findByIdAndUpdate(id, {Name, players, about}, {new: true})
        .then((tournament) => res.status(200).json(tournament))
        .catch((err) => handleError(res, err));
};
module.exports = {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament
}