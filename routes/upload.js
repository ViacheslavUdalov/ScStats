const express = require('express');
const checkAuth = require("../utilits/checkAuth");
const router = express.Router();
const multer = require('multer');
// multer - middleware -  используется для загркзки файлов на сервер
// создаём хранилище, с помощью multer.diskStorage
const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        // callback не получает никаких ошибок, и загружает файлы в папку 'uploads'
        callback(null, 'uploads');
    },
    filename: (_, file, callback) => {
        callback(null, file.originalname);
    }
});
// взаимодействие хранилища с express.js, upload - функция, которая позволяет использовать хранилище.
const upload = multer({storage});
// обращается к функции хранилища - upload, ожидает файл под названием 'image'
router.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.status(200).json({
        url: `/uploads/${req.file.originalname}`
    })
});
module.exports = router;