const { Ride, RideParticipant, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class TaxiController {
    // POST /api/taxi/
    async createRide(req, res, next) {
        try {
            const { fromLocation, toLocation, startTime, price } = req.body;
            if (!fromLocation || !toLocation || !startTime || !price) {
                throw ApiError.badRequest('Все поля обязательны');
            }

            const ride = await Ride.create({
                userId: req.user.id,
                fromLocation, toLocation,
                startTime: new Date(startTime),
                price,
                status: 'PENDING'
            });
            return res.status(201).json(ride);
        } catch (err) { next(err); }
    }

    // GET /api/taxi/
    async getAllRides(req, res, next) {
        try {
            const rides = await Ride.findAll({
                include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }],
                order: [['startTime', 'DESC']]
            });
            return res.json(rides);
        } catch (err) { next(err); }
    }

    // GET /api/taxi/my
    async getMyRides(req, res, next) {
        try {
            const rides = await Ride.findAll({
                where: { userId: req.user.id },
                order: [['startTime', 'DESC']]
            });
            return res.json(rides);
        } catch (err) { next(err); }
    }

    // PUT /api/taxi/:rideId/status
    async changeStatus(req, res, next) {
        try {
            const { rideId } = req.params;
            const { status } = req.body; // EXPECTED: 'APPROVED' or 'CANCELLED'
            const ride = await Ride.findByPk(rideId);
            if (!ride) throw ApiError.notFound('Заявка не найдена');
            ride.status = status;
            await ride.save();
            return res.json(ride);
        } catch (err) { next(err); }
    }

    // GET /api/taxi/available
    async getAvailableRides(req, res, next) {
        try {
            const rides = await Ride.findAll({
                where: { status: 'APPROVED' },
                include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }],
                order: [['startTime', 'ASC']]
            });
            return res.json(rides);
        } catch (err) { next(err); }
    }

    // POST /api/taxi/:rideId/join
    async joinRide(req, res, next) {
        try {
            const { rideId } = req.params;
            const ride = await Ride.findByPk(rideId);
            if (!ride || ride.status !== 'APPROVED') {
                throw ApiError.badRequest('Нельзя присоединиться к этой заявке');
            }
            // Проверяем что ещё не зарегистрирован
            const exists = await RideParticipant.findOne({
                where: { rideId, userId: req.user.id }
            });
            if (exists) throw ApiError.badRequest('Вы уже участвуете в этой поездке');
            const part = await RideParticipant.create({
                rideId, userId: req.user.id
            });
            return res.status(201).json(part);
        } catch (err) { next(err); }
    }

    async completeRide(req, res, next) {
        try {
            const { rideId } = req.params;
            const ride = await Ride.findByPk(rideId);
            if (!ride) {
                throw ApiError.notFound('Поездка не найдена');
            }
            if (ride.userId !== req.user.id) {
                throw ApiError.forbidden('Вы не можете завершить эту поездку');
            }
            if (ride.status !== 'APPROVED') {
                throw ApiError.badRequest('Нельзя завершить поездку в этом статусе');
            }

            ride.status = 'COMPLETED';
            await ride.save();
            return res.json(ride);

        } catch (err) { next(err); }
    }

    // DELETE /api/taxi/:rideId/join
    async leaveRide(req, res, next) {
        try {
            const { rideId } = req.params;
            const part = await RideParticipant.findOne({
                where: { rideId, userId: req.user.id }
            });
            if (!part) throw ApiError.notFound('Вы не участвуете в этой поездке');
            await part.destroy();
            return res.json({ message: 'Вы отменили участие' });
        } catch (err) { next(err); }
    }
}

module.exports = new TaxiController();
