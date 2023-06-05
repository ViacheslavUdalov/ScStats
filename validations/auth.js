const {body} = require('express-validator');
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
    loginValidation
}