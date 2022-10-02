const uuid = require('uuid');
const path = require('path');

const {Author} = require('../models/models');
const ApiError = require('../error/ApiError');


class AuthorController {
    async create(req, res, next) {
        try {
            const {id} = req.user;
            let {name, description, countryId} = req.body;
            const {photo} = req.files;
            let fileName = uuid.v4() + ".jpg";

            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const author = await Author.create({name, description, userId: id, countryId, photo: fileName});            
            return res.json(author);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const {id} = req.user;
            let {countryId, limit, page} = req.query;  //req.query - в строку запроса. req.body - в теле запроса
            page = page || 1;
            limit = limit || 8;
            let offset = page * limit - limit;
            let authors;            

            if (countryId) {
                authors = await Author.findAndCountAll({where:{userId: id, countryId}, limit, offset});
            } else {
                authors = await Author.findAndCountAll({where:{userId: id}, limit, offset});
            }

            return res.json(authors);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getONe(req, res, next) {
        try {
            const {id} = req.params;
            const author = await Author.findOne({where: {userId: req.user.id, id}});
            return res.json(author);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Author.destroy({where: {userId: req.user.id, id}});
            return res.json('Author was deleted');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, description, photo, countryId} = req.body;
            await Author.update({name, description, photo, countryId}, {where: {userId: req.user.id, id}});
            return res.json('Author was updated');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new AuthorController();