import api from '../api';

export const carInfoService = {
    fetchCarById: (carId) =>
        api
            .get(`/cars/${carId}/info`)
            .then(res => res.data),
};