const express = require('express');
const router = express.Router();
const handleValidationErrors = require('../utilits/handeValidationErrors')
const {
    authMe,
    login,
    register,
    editMe,
    getUsers,
    getOneUser,
    editUserRank
} = require('../controllers/user-controller');
const checkAuth  = require("../utilits/checkAuth");
const {registerValidation, loginValidation, editValidation} = require("../validations/auth");


// handleValidationErrors указывает на точные ошибки в каких полях допущены
router.post('/auth/login', loginValidation, handleValidationErrors, login);
router.post('/auth/register', registerValidation, handleValidationErrors, register);
router.patch('/auth/:id', handleValidationErrors, editMe);
router.get('/auth/me',  checkAuth, authMe);
router.get('/users', getUsers);
router.get('/user/:id', getOneUser);
router.patch('/user/editrank/:id', editUserRank);
module.exports = router;