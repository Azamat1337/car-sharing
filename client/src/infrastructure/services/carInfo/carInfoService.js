import api from '../api';

export const carInfoService = {
    fetchCarById: (carId) =>
        api
            .get(`/cars/${carId}/info`)
            .then(res => res.data),

    create: (carId, { attributeName, attributeValue }) =>
        api
            .post(`/cars/${carId}/info`, { attributeName, attributeValue })
            .then(res => res.data),

    update: (carId, infoId, { attributeName, attributeValue }) =>
        api
            .put(`/cars/${carId}/info/${infoId}`, { attributeName, attributeValue })
            .then(res => res.data),

    remove: (carId, infoId) =>
        api
            .delete(`/cars/${carId}/info/${infoId}`)
            .then(res => res.data),
};