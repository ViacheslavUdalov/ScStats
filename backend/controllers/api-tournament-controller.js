const Tournament = require("../models/tournament");
const handleError = (res, err) => {
    res.status(500).send(err.message)
}
const getTournaments = async (req, res) => {
    // С помощью  .populate('user').exec() подключаем к турниру связь с игроком
    try {
        const {searchTerm, page, perPage} = req.query;
        // new RegExp -  конструктор объекта регулярного выражения в JavaScript.
        // Позволяет искать сопостовления в строке без учёта регистра - 'i'
        const regex = new RegExp(searchTerm, 'i');
        const filter = searchTerm ? {Name: {$regex: regex}} : {};
        const tournaments = await Tournament.find(filter)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({createdAt: -1})
            .populate('Owner')
            .populate('players')

        const totalCount = await Tournament.countDocuments(filter);
        res.status(200).json({
            tournaments: tournaments,
            totalCount: totalCount
        })
    } catch (err) {
        handleError(res, err)
    }
};
const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id)
            .populate('Owner')
            .populate('players')
        res.status(200)
            .json(tournament);

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
const addTournament = async (req, res) => {
    try {
        const doc = new Tournament({
            Name: req.body.Name,
            players: req.body.players,
            Owner: req.body.Owner,
            about: req.body.about,
            imageUrl: req.body.imageUrl,
            bracket: []
        });
        const tournament = await doc.save();
        res.status(200).json(tournament)
    } catch (err) {
        handleError(res, err);
    }
};
const editTournament = async (req, res) => {
    try {
    //вытаскиваем все данные из запроса и передаём их в метод update по определённому _id
    const {Name, players, Owner, about, imageUrl, bracket} = req.body;
    const {id} = req.params;
    const tournament = await Tournament
        .findByIdAndUpdate(id, {Name, players, Owner, about, imageUrl, bracket}, {new: true})
        .populate('Owner')
        .populate('players')
        res.status(200).json(tournament)
}
        catch (err) {
    handleError(res, err)
}
};


module.exports = {
    getTournaments,
    deleteTournament,
    getTournament,
    addTournament,
    editTournament
}