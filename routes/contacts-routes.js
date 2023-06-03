const express = require('express');
const router = express.Router();
const createPath = require('../helpers/create-path');
router.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        {
            rank: 10,
            nickname: "TYTY",
            country: "kr",
            race: "terran",
            rating: 2500
        },

        {
            rank: 2,
            nickname: "Serral",
            country: "eu",
            race: "zerg",
            rating: 3400
        },
        {
            rank: 10,
            nickname: "TYTY",
            country: "kr",
            race: "terran",
            rating: 2500
        },
        {
            rank: 5,
            nickname: "Dark",
            country: "kr",
            race: "zerg",
            rating: 3300
        }
    ]
    res.render(createPath('contacts'), {contacts, title});
});
module.exports = router;