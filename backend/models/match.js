const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MatchSchema = new Schema({
    match: {
        // matchDate: Date,
        players: [{
            name: String,
            _id: String
        }],
    //     matchResult: {
    //        winner: {
    //            name: String,
    //            _id: String
    //        },
    //         loser: {
    //             name: String,
    //             _id: String
    //         }
    //     },
        winner: {
            name: String,
            _id: String
        }
    }
})
const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;