const {Brand} = require('../models/models');

class BrandController {
    async createBrand(req, res, next) {
        try {
            const {name} = req.body;
            const brand = await Brand.create({name});
            return res.json(brand);
        } catch (e) {
            return res.status(400).json({error: e});
        }
    }

    async getAllBrands(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.json(brands);
        } catch(e) {
            return res.status(400).json({error: e});
        }
    }
}

module.exports = new BrandController();