const uuid = require('uuid');
const path = require('path');

const {Book} = require('../models/models');
const ApiError = require('../error/ApiError');


class BookController {
    async create(req, res, next) {
        try {
            const {id} = req.user;
            let {name, link, rating, comment, countryId, authorId} = req.body;
            const {cover} = req.files;
            let fileName = uuid.v4() + ".jpg";

            cover.mv(path.resolve(__dirname, '..', 'static', fileName));

            const book = await Book.create({name, link, rating, comment, userId: id, countryId, authorId, cover: fileName});            
            return res.json(book);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const {id} = req.user;
            let {countryId, authorId, limit, page} = req.query;  //req.query - в строку запроса. req.body - в теле запроса
            page = page || 1;
            limit = limit || 8;
            let offset = page * limit - limit;
            let books;

            if (!countryId && !authorId) {
                books = await Book.findAndCountAll({where:{userId: id}, limit, offset});
            }

            if (countryId && !authorId) {
                books = await Book.findAndCountAll({where:{userId: id, countryId}, limit, offset});
            }

            if (!countryId && authorId) {
                books = await Book.findAndCountAll({where:{userId: id, authorId}, limit, offset});
            }

            if (countryId && authorId) {
                books = await Book.findAndCountAll({where:{userId: id, countryId, authorId}, limit, offset});
            }

            return res.json(books);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getONe(req, res, next) {
        try {
            const {id} = req.params;
            const book = await Book.findOne({where: {userId: req.user.id, id}});
            return res.json(book);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Book.destroy({where: {userId: req.user.id, id}});
            return res.json('Book was deleted');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, link, rating, comment, cover, countryId, authorId} = req.body;
            await Book.update({name, link, rating, comment, cover, countryId, authorId}, {where: {userId: req.user.id, id}});
            return res.json('Book was updated');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new BookController();