const Tournament = require("../models/tournament");
const User = require('../models/user')
const handleError = (res, err) => {
    res.status(500).send(err.message)
}
const getTournaments = async (req, res) => {
    // С помощью  .populate('user').exec() подключаем к турниру связь с игроком
    try {
        const tournaments = await Tournament.find().sort({createdAt: -1}).populate('Owner').exec();
        res.status(200).json(tournaments)
    } catch (err) {
        handleError(res, err)
    }
};
const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate('Owner').exec();
        res.status(200).json(tournament);
    } catch (err) {
        handleError(res, err)
    }
}
const deleteTournament = async (req, res) => {
   Tournament
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({
            success: true
        }))
        .catch((err) => handleError(res, err));
}
// const followTournament = async (req, res) => {
//     const {followed} = req.body
//     Tournament
//         .findByIdAndUpdate(req.params.id, {followed}, {new: true})
//         .then((tournament) => res.status(200).json(tournament))
//         .catch((err) => handleError(res, err));
// }
// const unFollowTournament = async (req, res) => {
//     const {followed} = req.body
//     Tournament
//         .findByIdAndUpdate(req.params.id, {followed}, {new: true})
//         .then((tournament) => res.status(200).json(tournament))
//         .catch((err) => handleError(res, err));
// }
const addTournament = async (req, res) => {
    try {
        // const doc = new Tournament(req.body)
        const doc = new Tournament({
            Name: req.body.Name,
            players: req.body.players,
            Owner: req.userId,
            about: req.body.about,
            imageUrl: req.body.imageUrl
        });
        const tournament = await doc.save();
            res.status(200).json(tournament)
    }catch (err) {
        handleError(res, err);
    }
};
const editTournament = async (req, res) => {
    //вытаскиваем все данные из запроса и передаём их в метод update по определённому _id
    const {Name, players, Owner, about, tournamentAvatar} = req.body;
    const {id} = req.params;
    Tournament
        .findByIdAndUpdate(id, {Name, players, Owner, about, tournamentAvatar}, {new: true})
.then((tournament) => res.status(200).json(tournament))
        .catch((err) => handleError(res, err));
};
// const JoinTournament = async (req, res) => {
//     //вытаскиваем все данные из запроса и передаём их в метод update по определённому _id
//     const {id} = req.params;
//     const user = req.userId;
//     Tournament
//         .findByIdAndUpdate(id, {$push: {players: user}})
//         .then((tournament) => res.status(200).json(tournament))
//         .catch((err) => handleError(res, err));
// };

module.exports = {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament
}