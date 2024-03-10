const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        avatarURL: String,
        rank: {
            type: Number,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        race: {
            type: String,
            required: false
        },
    matches: [{
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
    }]
    },
    {
    timestamps: true
})
const User = mongoose.model('User', UserSchema);
module.exports = User;