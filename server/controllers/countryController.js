const {Country} = require('../models/models');
const ApiError = require('../error/ApiError');

class CountryController {
    async create(req, res, next) {
        const {id} = req.user;
        const {name} = req.body;
        const candicate = await Country.findOne({where: {userId: id, name}});
        if (candicate) {
            return next(ApiError.badRequest('Такая страна уже существует!'));
        } 

        const country = await Country.create({userId: id, name});        
        return res.json(country);
    }

    async getAll(req, res) {
        const {id} = req.user;
        const countries = await Country.findAll({where:{userId: id}});
        return res.json(countries);
    }

    async delete(req, res) {
        const {name} = req.params;
        await Country.destroy({where: {userId: req.user.id, name}});
        return res.json('Country was deleted');
    }

    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;
        await Country.update({name}, {where: {userId: req.user.id, id}});
        return res.json('Country was updated');
    }
};

module.exports = new CountryController();