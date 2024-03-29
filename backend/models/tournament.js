const mongoose = require('mongoose');
const Match = require("./Match");

const Schema = mongoose.Schema;
    const TournamentSchema = new Schema({
        Name: {
            type: String,
            required: true
        },
        Owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
       players: [{
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true
       }],
        about: {
            type: String,
            required: true
        },
        imageUrl: String,
        bracket: [[
            {
                matchDate: Date,
                players: [{
                    fullName: String,
                    _id: String,
                    score: Number
                }],
                winner: {
                    fullName: String,
                    _id: String
                }
            }
        ]]
    }, { timestamps: true });
const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament;