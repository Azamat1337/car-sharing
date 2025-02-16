const {Rental, Car, User} = require('../models/models');
const {Op} = require("sequelize");

class RentalController {
    async createRental(req, res, next) {
        try {
            const { startTime, endTime, carId } = req.body;
            if (!carId || !startTime || !endTime) {
                return res.status(400).json({message: 'All fields are required!'});
            }

            const start = new Date(startTime);
            const end = new Date(endTime);
            if (start >= end) {
                return res.status(400).json({message: 'Start Time must be before End Time!'});
            }

            const overlappingResults = await Rental.findAll({
                where: {
                    carId,
                    [Op.or]: [
                        // 1 случай
                        { startTime: { [Op.between]: [start,end] } },
                        // 2 случай
                        { endTime: { [Op.between]: [start,end] } },
                        // 3 случай
                        {
                            startTime: { [Op.lte]: start },
                            endTime: { [Op.gte]: end },
                        }

                    ]
                }
            });
            if (overlappingResults.length > 0) {
                return res.status(400).json({message: 'Car is already booked for selected period.'});
            }

            const rental = await Rental.create({
                startTime: start,
                endTime: end,
                carId,
                userId: req.user.id,
            });
            return res.status(201).json(rental);
        } catch(e) {
            next(e);
        }
    }

    async getAllRentals(req, res, next) {
        try {
            const rentals = await Rental.findAll({
                where: {userId: req.user.id},
                include: [
                    {model: Car, as: 'Car'},
                    {model: User, as: 'User'},
                ]
            });
            return res.json(rentals);
        } catch (e) {
            next(e);
        }
    }

    async getRentalById(req, res, next) {
        try {
            const {id} = req.params;
            const rental = await Rental.findByPk(id, {
                include: [
                    {model: Car, as: 'Car'},
                    {model: User, as: 'User'},
                ],
            });
            return res.json(rental);
        } catch (e) {
            next(e);
        }
    }

    async updateRental(req, res, next) {
        try {
            const {id} = req.params;
            const {startTime, endTime} = req.body;
            const rental = await Rental.findByPk(id);
            if (!rental) {
                return res.status(404).json({message: 'Rental not found!'});
            }

            const start = new Date(startTime);
            const end = new Date(endTime);
            if (start >= end) {
                return res.status(400).json({message: 'Start Time must be before End Time!'});
            }

            const overlappingResults = await Rental.findAll({
                where: {
                    carId: rental.carId,
                    id: {[Op.ne]: id},
                    [Op.or]: [
                        { startTime: { [Op.between]: [start,end] } },
                        { endTime: { [Op.between]: [start, end] } },
                        {
                            startTime: { [Op.lte]: start },
                            endTime: { [Op.gte]: end },
                        }
                    ]
                }
            });

            if (overlappingResults.length > 0) {
                return res.status(400).json({message: 'Car is already booked for selected period.'});
            }

            await rental.update({startTime: start, endTime: end});
            return res.json(rental);
        } catch (e) {
            next(e);
        }
    }

    async deleteRental(req, res, next) {
        try {
            const {id} = req.params;
            const rental = await Rental.findByPk(id);
            if (!rental) {
                return res.status(404).json({message: 'Rental not found!'});
            }
            if (rental.userId !== req.user.id) {
                return res.status(403).json({message: 'Access denied!'});
            }
            await rental.destroy();
            return res.json({message: 'Rental deleted!'});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RentalController();