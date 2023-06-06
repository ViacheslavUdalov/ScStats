const express = require('express');
const router = express.Router();
const handleValidationErrors = require('../utilits/handeValidationErrors')

const {
    authMe,
    login,
    register
} = require('../controllers/user-controller');
const checkAuth  = require("../utilits/checkAuth");
const {registerValidation, loginValidation} = require("../validations/auth");
// handleValidationErrors указывает на точные ошибки в каких полях допущены
router.post('/auth/login', loginValidation, handleValidationErrors, login);
router.post('/auth/register', registerValidation, handleValidationErrors, register);
router.get('/auth/me', checkAuth, authMe);
module.exports = router;