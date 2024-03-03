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
            required: true,
            unique: true
        },
       players: [{
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true,
           unique: true
       }],
        about: {
            type: String,
            required: true
        },
        imageUrl: String,
        matches: [Match.schema]
    }, { timestamps: true });
const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament;