const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
// const {User, Basket} = require('../models/models');

require('dotenv').config();

const generateJwt = (id, username) => {
    return jwt.sign(
        {id, username}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};


class UserController {
    async register(req, res, next) {
        try {            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // return next(ApiError.badRequest('Некорректный username или password'));
                return res.status(400).json({message: "Некорректный username или password", errors})
            }

            const {username, password} = req.body;

            const candidate = await User.findOne({where: {username}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует!'));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({username, password: hashPassword});
            // const basket = await Basket.create({userId: user.id});
            const token = generateJwt(user.id, user.username);

            return res.json({token});

        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body;

            const user = await User.findOne({where: {username}});
            if (!user) {
                return next(ApiError.internal('Такого пользователя нет!'));
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal('Пароль не совпал!'));
            }

            const token = generateJwt(user.id, user.username);
            return res.json({token});

        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.username);
            return res.json({token});
        } catch(err) {
            ApiError.badRequest('Ошибка запроса...')
        }        
    }
};

module.exports = new UserController();