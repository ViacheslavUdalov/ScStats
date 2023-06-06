const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const {
    tournamentApiRoutes,
    PlayersRoutes,
    UserRoutes,
    uploadRouter
} = require('./routes/index');

const db = 'mongodb+srv://slava187115:taser115@cluster0.wneqys3.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(db)
    .then((res) => console.log('Connected to Data Base'))
    .catch((err) => console.log(err));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Через mongoose model Все модели подключаются к базе данных
app.use(PlayersRoutes);
app.use(tournamentApiRoutes);
app.use(UserRoutes);
app.use(uploadRouter);
// express.static нужен для обслуживания статичных файлов, при запросе на URL '/uploads', проверяет, есть ли в папке uploads то, что передал клиент, то есть есть ли файл
app.use('/uploads', express.static('uploads'));
app.use((req, res) => {
    res
        .status(404)
        .send(console.log('Error'));
})
