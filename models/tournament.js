const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Player = require('./player').schema;
const TournamentSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    players: [Player],
    about: {
        type: String,
        required: true
    },
}, { timestamps: true });
const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament;

    // {
    //     rank: Number,
    //     nickname: {
    //         type: String
    //     },
    //     country: String,
    //     race: {
    //         type: String
    //     },
    //     rating: Number
    // }

