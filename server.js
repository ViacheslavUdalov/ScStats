const express = require('express');
const createPath = require('./helpers/create-path');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const tournamentApiRoutes = require('./routes/api-tournament-routes');
const PORT = 3000;
// const TournamentRoutes = require('./routes/tournament-routes');
const ContactsRoutes = require('./routes/contacts-routes');
const morgan = require('morgan');
app.set('view engine', 'ejs');

const db = 'mongodb://0.0.0.0:27017/ScTour';
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connected to Data Base'))
    .catch((err) => console.log(err));
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('main'), {title});
});

// app.use(TournamentRoutes);
app.use(ContactsRoutes);
app.use(tournamentApiRoutes);
app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {title});
})
