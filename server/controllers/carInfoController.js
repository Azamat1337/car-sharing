const { CarInfo, Car } = require('../models/models');
const ApiError = require('../error/ApiError');

class CarInfoController {
    // POST /api/cars/:carId/info
    async create(req, res, next) {
        try {
            const { carId } = req.params;
            const { attributeName, attributeValue } = req.body;

            if (!attributeName || !attributeValue) {
                return next(ApiError.badRequest('Attribute name and value are required'));
            }

            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            const info = await CarInfo.create({
                carId,
                attributeName,
                attributeValue
            });

            return res.status(201).json(info);
        } catch (err) {
            next(err);
        }
    }

    // GET /api/cars/:carId/info
    async getAllByCar(req, res, next) {
        try {
            const { carId } = req.params;

            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            const infos = await CarInfo.findAll({
                where: { carId },
                order: [['id', 'ASC']]
            });

            return res.json(infos);
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/cars/:carId/info/:infoId
    async update(req, res, next) {
        try {
            const { carId, infoId } = req.params;
            const { attributeName, attributeValue } = req.body;

            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            const info = await CarInfo.findOne({ where: { id: infoId, carId } });
            if (!info) {
                return next(ApiError.notFound(`Info with id=${infoId} not found for car ${carId}`));
            }

            info.attributeName = attributeName ?? info.attributeName;
            info.attributeValue = attributeValue ?? info.attributeValue;
            await info.save();

            return res.json(info);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/cars/:carId/info/:infoId
    async delete(req, res, next) {
        try {
            const { carId, infoId } = req.params;

            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            const info = await CarInfo.findOne({ where: { id: infoId, carId } });
            if (!info) {
                return next(ApiError.notFound(`Info with id=${infoId} not found for car ${carId}`));
            }

            await info.destroy();
            return res.json({ message: 'Info deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CarInfoController();
