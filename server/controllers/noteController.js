const {Note} = require('../models/models');
const ApiError = require('../error/ApiError');


class NoteController {
    async create(req, res, next) {
        try {
            const {id} = req.user;
            let {name} = req.body;

            const note = await Note.create({name, userId: id});            
            return res.json(note);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const {id} = req.user;
            let {limit, page} = req.query;  
            page = page || 1;
            limit = limit || 8;
            let offset = page * limit - limit;

            const notes = await Note.findAndCountAll({where:{userId: id}, limit, offset});
            return res.json(notes);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getONe(req, res, next) {
        try {
            const {id} = req.params;
            const note = await Note.findOne({where: {userId: req.user.id, id}});
            return res.json(note);

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Note.destroy({where: {userId: req.user.id, id}});
            return res.json('Note was deleted');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {name, link, rating, comment, cover} = req.body;
            await Note.update({name, link, rating, comment, cover}, {where: {userId: req.user.id, id}});
            return res.json('Note was updated');

        } catch(err) {
            next(ApiError.badRequest(err.message));
        }
    }
};

module.exports = new NoteController();