const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MatchSchema = new Schema({
    match: {
        matchDate: Date,
        players: [{
            fullName: String,
            _id: String,
            score: Number,
            rank: Number
        }],
        winner: {
            fullName: String,
            _id: String,
            rank: Number
        }
    }
})
const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;