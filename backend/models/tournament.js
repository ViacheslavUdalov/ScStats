const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TournamentSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        ref: 'Player',
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    followed: Boolean,
    about: {
        type: String,
        required: true
    },
    imageUrl: String
}, { timestamps: true });
const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament;