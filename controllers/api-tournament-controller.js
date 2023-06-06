const Tournament = require("../models/tournament");
const handleError = (res, err) => {
    res.status(500).send(err.message)
}
const getTournaments =async (req, res) => {
    // С помощью  .populate('user').exec() подключаем к турниру связь с игроком
    await Tournament
        .find()
        .sort({createdAt: -1})
        .populate('user').exec()
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
const addTournament = async (req, res) => {
    try {
        const doc = new Tournament({
            Name: req.body.Name,
            players: req.body.players,
            user: req.userId,
            about: req.body.about,
            tournamentAvatar: req.body.tournamentAvatar
        });
        const tournament = await doc.save();
            res.status(200).json(tournament)
    }catch (err) {
        handleError(res, err);
    }
};
const editTournament = (req, res) => {
    //вытаскиваем все данные из запроса и передаём их в метод update по определённому _id
    const {Name, players, user, about, tournamentAvatar} = req.body;
    const {id} = req.params;
    Tournament
        .findByIdAndUpdate(id, {Name, players, user, about, tournamentAvatar}, {new: true})
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