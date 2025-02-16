const {Car, CarInfo, Brand} = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class CarController {
    async createCar(req, res, next) {
        try {
            const {model, year, available, brandId, attributes} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', `static`, fileName));

            if (!model || !year || !available) {
                return res.status(400).json({message: 'All fields are not filled in!'});
            }

            const car = await Car.create({model, year, available, brandId, adminId: req.user.id});

            if (attributes && Array.isArray(attributes)) {
                for (let attr of attributes) {
                    await CarInfo.create({
                        carId: car.id,
                        attributeName: attr.attributeName,
                        attributeValue: attr.attributeValue,
                    });
                }
            }

            return res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    }

    async deleteCar(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id);

            if (!car) {
                return res.status(404).json({message: 'Car not found!'});
            }

            await car.destroy();
            return res.json({message: 'The car was deleted'});
        } catch (e) {
            next(e);
        }
    }

    async updateCar(req, res, next) {
        try {
            const {id} = req.params;
            const {brandId, model, year, available, attributes} = req.body;
            const car = await Car.findByPk(id);

            if (!car) {
                return res.status(404).json({message: 'Car not found!'});
            }

            await car.update({brandId, model, year, available});
            if (attributes && Array.isArray(attributes)) {
                await CarInfo.destroy({where: {carId: car.id}});
                for (const attr of attributes) {
                    await CarInfo.create({
                        carId: car.id,
                        attributeName: attr.attributeName,
                        attributeValue: attr.attributeValue,
                    });
                }
            }

            return res.json(car);
        } catch (err) {
            next(err);
        }
    }

    async getAllCars(req, res, next) {
        try {
            const {brandId, model, year, available} = req.params;
            let filter = {};

            if (brandId) filter.brandId = brandId;
            if (model) filter.model = model;
            if (year) filter.year = year;
            if (available !== undefined) filter.available = available;

            const cars = await Car.findAll({
                where: filter,
                include: [
                    {model: Brand, as: 'Brand'},
                    {model: CarInfo, as: 'CarInfo'},
                ]
            });

            return res.json(cars);
        } catch (err) {
            next(err);
        }
    }

    async getCarById(req, res, next) {
        try {
            const {id} = req.params;
            const car = await Car.findByPk(id, {
                include: [
                    {model: Brand, as: 'Brand'},
                    {model: CarInfo, as: 'CarInfo'},
                ]
            });

            if (!car) {
                return res.status(404).json({message: 'Car not found!'});
            }
            return res.json(car);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CarController();