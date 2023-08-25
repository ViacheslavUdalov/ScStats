const userModel = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const password = req.body.password;
        // алгоритм шифрования пароля
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const doc = new userModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarURL: req.body.avatarURL,
            passwordHash: hash
        })
        // сохраняем юзера в базе данных с помощью метода save
        const user = await doc.save();
        // шифруем токен с помощью jwt.sign* и шифруем _id, который хранится в монго дб
        // именно поэтому с нижним подчёркиванием
        // вторым парамметром указывается ключ, с помощью которого шифруется токе - 'secret123'
        // третьим парамметром указывается сколько будет храниться токен - {expiresIn: '30d'}
        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })
        // разделяем данные, с помощью деструктуризации и отдельно берём захешированный пароль и остальные данные юзера
        // с помощью _doc берём только нужную информацию о юзере, Без _doc будет очень много дополнительных полей об инфромации запроса.
        const {passwordHash, ...userData } = user._doc;
        // возращаем информацию о пользователе, без пароля и сам токен
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
            // return нужен, чтобы дальнейший нижений код не выполнялся и сразу выдавало сообщение об ошибке
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
module.exports = {
    register,
    login,
    authMe,
    editMe,
    getUsers,
    getOneUser
}