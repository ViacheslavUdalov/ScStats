const userModel = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarURL: req.body.avatarURL,
            passwordHash: hash,
            rank: 1200,
            country: '',
            race: ''
        });
        const user = await doc.save();
        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })
        const {passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться!'
        })
    }
};
const login = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        if (!user) {
            return res.status(403).json({
                message: 'Пользователь не найден'
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Неверный логин или пароль!'
            })
        }
        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            });
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
};
const authMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Пользователь не найден!'
        })
    }
};
const editMe = async (req, res) => {
    try {
        const {fullName, avatarURL, email} = req.body
        const {id} = req.params
        const user = await userModel.findByIdAndUpdate(id, {fullName, avatarURL, email}, {new: true})
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не возможно редактировать BE'
        })
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().sort({createdAt: -1})
        const totalUsersCount = await userModel.countDocuments()
        res.status(200).json({
            users: users,
            totalUsersCount: totalUsersCount
        })
    }
     catch (err) {
         console.log(err);
         res.status(500).json({
             message: 'Не возможно получить пользователей.'
         })
     }
}
const getOneUser = async (req, res) => {
    try {
        const client = await userModel.findById(req.params.id)
        res.status(200).json(client)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не возможно получить пользователей.'
        })
    }
}
const editUserRank = async (req, res) => {
    try {
        const {rank} = await req.body;
        const {id} = req.params;
        const user = await userModel.findByIdAndUpdate(id, {rank}, {new: true});
        res.status(200)
            .json(user);
    } catch (err) {
      res.status(500).json(err);
    }
}
module.exports = {
    register,
    login,
    authMe,
    editMe,
    getUsers,
    getOneUser,
    editUserRank
}