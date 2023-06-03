const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
    rank: {
        type: Number,
        required: false
    },
    nickname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    race: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
});
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;