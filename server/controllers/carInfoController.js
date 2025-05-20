const { CarInfo, Car } = require('../models/models');
const ApiError = require('../error/ApiError');

class CarInfoController {
    // POST /api/cars/:carId/info
    // Создать новую характеристику для автомобиля
    async create(req, res, next) {
        try {
            const { carId } = req.params;
            const { attributeName, attributeValue } = req.body;

            // Валидация
            if (!attributeName || !attributeValue) {
                return next(ApiError.badRequest('Attribute name and value are required'));
            }

            // Проверяем, что автомобиль существует
            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            // Создаём запись
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
    // Получить все характеристики для заданного автомобиля
    async getAllByCar(req, res, next) {
        try {
            const { carId } = req.params;

            // Проверяем, что автомобиль существует
            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            // Получаем все характеристики
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
    // Обновить характеристику
    async update(req, res, next) {
        try {
            const { carId, infoId } = req.params;
            const { attributeName, attributeValue } = req.body;

            // Проверяем, что автомобиль существует
            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            // Загружаем существующую характеристику
            const info = await CarInfo.findOne({ where: { id: infoId, carId } });
            if (!info) {
                return next(ApiError.notFound(`Info with id=${infoId} not found for car ${carId}`));
            }

            // Обновляем
            info.attributeName = attributeName ?? info.attributeName;
            info.attributeValue = attributeValue ?? info.attributeValue;
            await info.save();

            return res.json(info);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/cars/:carId/info/:infoId
    // Удалить характеристику
    async delete(req, res, next) {
        try {
            const { carId, infoId } = req.params;

            // Проверяем, что автомобиль существует
            const car = await Car.findByPk(carId);
            if (!car) {
                return next(ApiError.notFound(`Car with id=${carId} not found`));
            }

            // Находим запись
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
