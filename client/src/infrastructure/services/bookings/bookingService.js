import api from '../api.js';

export const bookingService = {
    getMyBookings: async () => {
        try {
            const response = await api.get('/bookings/my');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching my bookings');
        }
    },

    getAllBookings: async () => {
        try {
            const response = await api.get('/bookings');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching all bookings');
        }
    },

    getBookingById: async (id) => {
        try {
            const response = await api.get(`/bookings/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching booking with id ${id}`);
        }
    },

    createBooking: async ({ carId, startTime, endTime }) => {
        try {
            const response = await api.post('/bookings', { carId, startTime, endTime });
            return response.data;
        } catch (error) {
            throw new Error('Error creating booking');
        }
    }
}