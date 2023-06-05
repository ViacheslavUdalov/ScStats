const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const PORT = 3000;
const tournamentApiRoutes = require('./routes/api-tournament-routes');
const PlayersRoutes = require('./routes/api-players-routes');
const UserRoutes = require('./routes/user-router');
const db = 'mongodb+srv://slava187115:taser115@cluster0.wneqys3.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(db)
    .then((res) => console.log('Connected to Data Base'))
    .catch((err) => console.log(err));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.get('/', (req, res) => {
    res.send('hello!!!!')
});
// Через mongoose model Все модели подключаются к базе данных

app.use(PlayersRoutes);
app.use(tournamentApiRoutes);
app.use(UserRoutes);
app.use((req, res) => {
    res
        .status(404)
        .send(console.log('Error'));
})
