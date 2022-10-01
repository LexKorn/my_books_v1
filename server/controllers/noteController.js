const {Note} = require('../models/models');
const ApiError = require('../error/ApiError');


class NoteController {
    async create(req, res, next) {
        try {
            let {name, userId} = req.body;

            const note = await Note.create({name, userId});            
            return res.json(note);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query;  
            page = page || 1;
            limit = limit || 8;
            let offset = page * limit - limit;

            const notes = await Note.findAndCountAll({limit, offset});
            return res.json(notes);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getONe(req, res, next) {
        try {
            const {id} = req.params;
            const note = await Note.findOne({where: {id}});
            return res.json(note);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Note.destroy({where: {id}});
            return res.json('Note was deleted');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, link, rating, comment, cover} = req.body;
            await Note.update({name, link, rating, comment, cover}, {where: {id}});
            return res.json('Note was updated');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new NoteController();