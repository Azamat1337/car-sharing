const path = require('path');
const uuid = require('uuid');
const { Car, CarInfo, Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class CarController {
    // POST /api/cars
    async create(req, res, next) {
        try {
            const { model, year, brandId, available, info, rentalType } = req.body;
            const { img } = req.files || {};

            // Проверяем обязательные поля
            if (!model || !year || !brandId || !img) {
                throw ApiError.badRequest('Model, year, brandId and image are required');
            }

            // Проверяем бренд
            const brand = await Brand.findByPk(brandId);
            if (!brand) {
                throw ApiError.notFound(`Brand with id=${brandId} not found`);
            }

            // Сохраняем файл изображения
            const fileName = uuid.v4() + path.extname(img.name);
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            // Создаём автомобиль
            const car = await Car.create({
                model,
                year,
                available: available !== undefined ? available : true,
                img: fileName,
                brandId,
                rentalType: rentalType || 'DAILY'
            });

            // Дополнительные характеристики (опционально)
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

    // GET /api/cars
    async getAll(req, res, next) {
        try {
            const { brandId, year, model, available, page = 1, limit = 10, rentalType } = req.query;
            const filter = {};

            if (rentalType) filter.rentalType = rentalType;
            if (brandId) filter.brandId = brandId;
            if (year) filter.year = year;
            if (model) filter.model = model;
            if (available !== undefined) filter.available = available === 'true';

            const offset = (page - 1) * limit;

            const { count, rows } = await Car.findAndCountAll({
                where: filter,
                include: [
                    { model: Brand, as: 'brand', attributes: ['id', 'name'] },
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

    // GET /api/cars/:id
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id, {
                include: [
                    { model: Brand, as: 'brand', attributes: ['id', 'name'] },
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

    // PUT /api/cars/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { model, year, brandId, available, rentalType } = req.body;
            const car = await Car.findByPk(id);
            if (!car) {
                throw ApiError.notFound(`Car with id=${id} not found`);
            }

            if (brandId) {
                const brand = await Brand.findByPk(brandId);
                if (!brand) throw ApiError.notFound(`Brand with id=${brandId} not found`);
                car.brandId = brandId;
            }
            if (model !== undefined) car.model = model;
            if (year !== undefined) car.year = year;
            if (available !== undefined) car.available = available;
            if (rentalType !== undefined) {
                car.rentalType = rentalType;
            }

            await car.save();
            return res.json(car);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/cars/:id
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
