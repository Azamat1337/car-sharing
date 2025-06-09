const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    // GET /api/brands
    async getAllBrands(req, res, next) {
        try {
            const brands = await Brand.findAll({ order: [['name', 'ASC']] });
            return res.json(brands);
        } catch (err) {
            next(err);
        }
    }

    // GET /api/brands/:id
    async getBrandById(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                throw ApiError.notFound(`Brand with id=${id} not found`);
            }
            return res.json(brand);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/brands
    async createBrand(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                throw ApiError.badRequest('Brand name is required');
            }

            const exists = await Brand.findOne({ where: { name } });
            if (exists) {
                throw ApiError.badRequest('Brand already exists');
            }
            const brand = await Brand.create({ name });
            return res.status(201).json(brand);
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/brands/:id
    async updateBrand(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                throw ApiError.notFound(`Brand with id=${id} not found`);
            }
            if (name) {
                const duplicate = await Brand.findOne({ where: { name } });
                if (duplicate && duplicate.id !== brand.id) {
                    throw ApiError.badRequest('Another brand with this name already exists');
                }
                brand.name = name;
            }
            await brand.save();
            return res.json(brand);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/brands/:id
    async deleteBrand(req, res, next) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                throw ApiError.notFound(`Brand with id=${id} not found`);
            }
            await brand.destroy();
            return res.json({ message: 'Brand deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BrandController();
