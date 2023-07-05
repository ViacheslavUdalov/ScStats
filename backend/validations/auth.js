const {body} = require('express-validator');
const tournamentValidation = [
    body('Name', 'Введите название турнира').isLength({min: 3}).isString(),
    // body('players', 'Должно быть не менее 2-х игроков').isLength({min: 5}),
    // body('user', 'Создатель турнира').optional().isURL(),
    body('about', 'Описание турнира').isLength({min: 10}),
    body('tournamentAvatar', 'Неверная ссылка на аватар').optional().isURL()
]
const registerValidation = [
    body('email', 'Неверный email').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите Имя').isLength({min: 3}),
    body('avatarURL', 'Неверная ссылка на аватар').optional().isURL()
]
const loginValidation = [
    body('email', 'Неверный email').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min: 5}),
]
module.exports = {
    registerValidation,
    loginValidation,
    tournamentValidation
}