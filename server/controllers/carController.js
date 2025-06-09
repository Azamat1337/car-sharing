const path = require('path');
const uuid = require('uuid');
const { Car, CarInfo, Brand, Company } = require('../models/models'); // Добавляем Company
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class CarController {
    // POST /api/car
    async create(req, res, next) {
        try {
            const { model, year, brandId, companyId, available, info, rentalType, dailyPrice, hourlyPrice } = req.body;
            const { img } = req.files || {};

            if (!model || !year || !brandId || !img) {
                throw ApiError.badRequest('Model, year, brandId and image are required');
            }

            const brand = await Brand.findByPk(brandId);
            if (!brand) {
                throw ApiError.notFound(`Brand with id=${brandId} not found`);
            }

            if (companyId) {
                const company = await Company.findByPk(companyId);
                if (!company) {
                    throw ApiError.notFound(`Company with id=${companyId} not found`);
                }
            }

            if ((rentalType === 'DAILY' || rentalType === 'BOTH') && (!dailyPrice || Number(dailyPrice) <= 0)) {
                throw ApiError.badRequest('dailyPrice должен быть больше 0 для посуточной аренды');
            }
            if ((rentalType === 'HOURLY' || rentalType === 'BOTH') && (!hourlyPrice || Number(hourlyPrice) <= 0)) {
                throw ApiError.badRequest('hourlyPrice должен быть больше 0 для каршеринга');
            }

            const fileName = uuid.v4() + path.extname(img.name);
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const car = await Car.create({
                model,
                year,
                available: available !== undefined ? available : true,
                img: fileName,
                brandId,
                companyId: companyId || null,
                rentalType: rentalType || 'DAILY',
                dailyPrice: dailyPrice || 0,
                hourlyPrice: hourlyPrice || 0
            });

            if (info) {
                const parsed = JSON.parse(info);
                for (const item of parsed) {
                    await CarInfo.create({
                        carId: car.id,
                        attributeName: item.attributeName,
                        attributeValue: item.attributeValue
                    });
                }
            }

            return res.status(201).json(car);
        } catch (err) {
            next(err);
        }
    }

    // GET /api/car
    async getAll(req, res, next) {
        try {
            const { brandId, companyId, year, model, available, page = 1, limit = 10, rentalType } = req.query;
            const filter = {};

            if (rentalType) filter.rentalType = rentalType;
            if (brandId) filter.brandId = brandId;
            if (companyId) filter.companyId = companyId;
            if (year) filter.year = year;
            if (model) {
                filter.model = { [Op.iLike]: `%${model}%` };
            }
            if (available !== undefined) filter.available = available === 'true';

            const offset = (page - 1) * limit;

            const { count, rows } = await Car.findAndCountAll({
                where: filter,
                include: [
                    { model: Brand, as: 'brand', attributes: ['id', 'name'] },
                    { model: Company, as: 'company', attributes: ['id', 'name', 'description'] }, // Добавляем Company
                    { model: CarInfo, as: 'info', attributes: ['attributeName', 'attributeValue'] }
                ],
                order: [['id', 'ASC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            return res.json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page),
                cars: rows
            });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/car/:id
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id, {
                include: [
                    { model: Brand, as: 'brand', attributes: ['id', 'name'] },
                    { model: Company, as: 'company', attributes: ['id', 'name', 'description', 'foundedYear'] }, // Добавляем Company
                    { model: CarInfo, as: 'info', attributes: ['attributeName', 'attributeValue'] }
                ]
            });
            if (!car) {
                throw ApiError.notFound(`Car with id=${id} not found`);
            }
            return res.json(car);
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/car/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { model, year, brandId, companyId, available, rentalType, dailyPrice, hourlyPrice } = req.body;
            const car = await Car.findByPk(id);
            if (!car) {
                throw ApiError.notFound(`Car with id=${id} not found`);
            }

            if (brandId) {
                const brand = await Brand.findByPk(brandId);
                if (!brand) throw ApiError.notFound(`Brand with id=${brandId} not found`);
                car.brandId = brandId;
            }

            if (companyId !== undefined) {
                if (companyId) {
                    const company = await Company.findByPk(companyId);
                    if (!company) throw ApiError.notFound(`Company with id=${companyId} not found`);
                }
                car.companyId = companyId;
            }

            if (model !== undefined) car.model = model;
            if (year !== undefined) car.year = year;
            if (available !== undefined) car.available = available;
            if (rentalType !== undefined) car.rentalType = rentalType;
            if (dailyPrice !== undefined) car.dailyPrice = dailyPrice;
            if (hourlyPrice !== undefined) car.hourlyPrice = hourlyPrice;

            if ((car.rentalType === 'DAILY' || car.rentalType === 'BOTH') && (!car.dailyPrice || Number(car.dailyPrice) <= 0)) {
                throw ApiError.badRequest('dailyPrice должен быть больше 0 для посуточной аренды');
            }
            if ((car.rentalType === 'HOURLY' || car.rentalType === 'BOTH') && (!car.hourlyPrice || Number(car.hourlyPrice) <= 0)) {
                throw ApiError.badRequest('hourlyPrice должен быть больше 0 для каршеринга');
            }

            await car.save();
            return res.json(car);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/car/:id
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id);
            if (!car) {
                throw ApiError.notFound(`Car with id=${id} not found`);
            }
            await car.destroy();
            return res.json({ message: 'Car deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CarController();