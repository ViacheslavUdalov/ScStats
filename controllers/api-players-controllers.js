const Player = require('../models/player');
const getPlayers = (req, res) => {
    Player
        .find()
        .then((players) => res.status(200).json(players))
        .catch((res, err) => {
            res.status(500).send(err.message)
        })
}
module.exports = {
    getPlayers
}