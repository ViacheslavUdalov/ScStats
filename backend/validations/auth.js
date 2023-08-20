const {body} = require('express-validator');
const tournamentValidation = [
    body('Name', 'Должно быть не менее 3-х символов').isLength({min: 3}).isString(),
    // body('players', 'Должно быть не менее 2-х игроков').isLength({min: 5}),
    // body('user', 'Создатель турнира').optional().isURL(),
    body('about', 'Должно быть не менее 3-х символов').isLength({min: 3}),
    // body('imageUrl', 'Неверная ссылка на аватар').optional().isURL()
]
const registerValidation = [
    body('email', 'Неверный формат email').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите Имя').isLength({min: 3}),
]
const loginValidation = [
    body('email', 'Неверный формат email').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({min: 5}),
]
const editValidation = [
    body('fullName', 'Имя должно содержать не менее 2-х символов').isLength({min: 2}),
    body('email', 'Неверный формат email').isEmail(),
    body('avatarURL', 'Неверная ссылка на аватар').optional().isURL()
]
module.exports = {
    registerValidation,
    loginValidation,
    tournamentValidation,
    editValidation
}