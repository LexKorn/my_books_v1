const {Country} = require('../models/models');
const ApiError = require('../error/ApiError');

class CountryController {
    async create(req, res, next) {
        const {name} = req.body;
        const candicate = await Country.findOne({where: {name}});
        if (candicate) {
            return next(ApiError.badRequest('Такая страна уже существует!'));
        } 

        const country = await Country.create({name});        
        return res.json(country);
    }

    async getAll(req, res) {
        const countries = await Country.findAll();
        return res.json(countries);
    }

    async delete(req, res) {
        const {name} = req.params;
        await Country.destroy({where: {name}});
        return res.json('Country was deleted');
    }

    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;
        await Country.update({name}, {where: {id}});
        return res.json('Country was updated');
    }
};

module.exports = new CountryController();