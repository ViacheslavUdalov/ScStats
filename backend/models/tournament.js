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
        unique: true
    },
    about: {
        type: String,
        required: true
    },
    imageUrl: String
}, { timestamps: true });
const Tournament = mongoose.model('Tournament', TournamentSchema);
module.exports = Tournament;


    // }


// {
//     //     rank: Number,
//     //     nickname: {
//     //         type: String
//     //     },
//     //     country: String,
//     //     race: {
//     //         type: String
//     //     },
//     //     rating: Number