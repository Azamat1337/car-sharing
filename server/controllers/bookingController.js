// controllers/bookingController.js
const { Booking, Car, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class BookingController {
    // GET /api/bookings
    // Admin-only: список всех бронирований
    async getAll(req, res, next) {
        try {
            const bookings = await Booking.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
                    { model: Car,  as: 'car',  attributes: ['id', 'model', 'year', 'img'] }
                ],
                order: [['startTime', 'DESC']]
            });
            return res.json(bookings);
        } catch (err) {
            next(err);
        }
    }

    // GET /api/bookings/my
    // Для авторизованного пользователя: его бронирования
    async getMy(req, res, next) {
        try {
            const userId = req.user.id;
            const bookings = await Booking.findAll({
                where: { userId },
                include: [
                    { model: Car, as: 'car', attributes: ['id', 'model', 'year', 'img'] }
                ],
                order: [['startTime', 'DESC']]
            });
            return res.json(bookings);
        } catch (err) {
            next(err);
        }
    }

    // GET /api/bookings/:id
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await Booking.findByPk(id, {
                include: [
                    { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
                    { model: Car,  as: 'car',  attributes: ['id', 'model', 'year', 'img'] }
                ]
            });
            if (!booking) {
                throw ApiError.notFound(`Booking with id=${id} not found`);
            }
            // Only owner or admin can view
            if (req.user.role !== 'ADMIN' && booking.userId !== req.user.id) {
                throw ApiError.forbidden('Access denied');
            }
            return res.json(booking);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/bookings
    async create(req, res, next) {
        try {
            const userId = req.user.id;
            const { carId, startTime, endTime } = req.body;
            if (!carId || !startTime || !endTime) {
                throw ApiError.badRequest('carId, startTime and endTime are required');
            }
            const start = new Date(startTime);
            const end   = new Date(endTime);
            if (start >= end) {
                throw ApiError.badRequest('startTime must be before endTime');
            }
            // Проверка, доступен ли автомобиль за период
            const overlap = await Booking.findOne({
                where: {
                    carId,
                    [Op.or]: [
                        { startTime: { [Op.between]: [start, end] } },
                        { endTime:   { [Op.between]: [start, end] } },
                        { startTime: { [Op.lte]: start }, endTime: { [Op.gte]: end } }
                    ]
                }
            });
            if (overlap) {
                throw ApiError.badRequest('Car is already booked for the selected period');
            }
            const booking = await Booking.create({ userId, carId, startTime: start, endTime: end });
            return res.status(201).json(booking);
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/bookings/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { startTime, endTime, status } = req.body;
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw ApiError.notFound(`Booking with id=${id} not found`);
            }
            // Only owner or admin can update
            if (req.user.role !== 'ADMIN' && booking.userId !== req.user.id) {
                throw ApiError.forbidden('Access denied');
            }
            const start = startTime ? new Date(startTime) : booking.startTime;
            const end   = endTime   ? new Date(endTime)   : booking.endTime;
            if (start >= end) {
                throw ApiError.badRequest('startTime must be before endTime');
            }
            // Проверка на пересечения, исключая текущую бронь
            const overlap = await Booking.findOne({
                where: {
                    carId: booking.carId,
                    id: { [Op.ne]: booking.id },
                    [Op.or]: [
                        { startTime: { [Op.between]: [start, end] } },
                        { endTime:   { [Op.between]: [start, end] } },
                        { startTime: { [Op.lte]: start }, endTime: { [Op.gte]: end } }
                    ]
                }
            });
            if (overlap) {
                throw ApiError.badRequest('Car is already booked for the selected period');
            }
            booking.startTime = start;
            booking.endTime   = end;
            if (status) booking.status = status;
            await booking.save();
            return res.json(booking);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/bookings/:id
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw ApiError.notFound(`Booking with id=${id} not found`);
            }
            // Only owner or admin can delete
            if (req.user.role !== 'ADMIN' && booking.userId !== req.user.id) {
                throw ApiError.forbidden('Access denied');
            }
            await booking.destroy();
            return res.json({ message: 'Booking cancelled successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BookingController();
