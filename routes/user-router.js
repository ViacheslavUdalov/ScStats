const express = require('express');
const router = express.Router();
const {
    authMe,
    login,
    register
} = require('../controllers/user-controller');
const checkAuth  = require("../utilits/checkAuth");
const {registerValidation, loginValidation} = require("../validations/auth");
router.post('/auth/login', loginValidation, login);
router.post('/auth/register', registerValidation, register);
router.get('/auth/me', checkAuth, authMe);
module.exports = router;