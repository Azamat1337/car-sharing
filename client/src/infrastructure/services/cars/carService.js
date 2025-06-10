import api from '../api';

export const carService = {
    fetchAll: ({ page = 1, limit = 10, brandId, year, model, available, rentalType } = {}) =>
        api
            .get('/car', { params: { page, limit, brandId, year, model, available, rentalType } })
            .then(res => res.data),

    fetchById: (id) =>
        api
            .get(`/car/${id}`)
            .then(res => res.data),

    create: (formData) => {
        return api
            .post('/car', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => res.data);
    },

    update: (id, { model, year, brandId, companyId, available, rentalType, dailyPrice, hourlyPrice }) => {
        const updateData = {};
        if (model !== undefined) updateData.model = model;
        if (year !== undefined) updateData.year = year;
        if (brandId !== undefined) updateData.brandId = brandId;
        if (companyId !== undefined) updateData.companyId = companyId; // Добавляем companyId
        if (available !== undefined) updateData.available = available;
        if (rentalType !== undefined) updateData.rentalType = rentalType;
        if (dailyPrice !== undefined) updateData.dailyPrice = dailyPrice;
        if (hourlyPrice !== undefined) updateData.hourlyPrice = hourlyPrice;
        return api
            .put(`/car/${id}`, updateData)
            .then(res => res.data);
    },

    remove: (id) =>
        api
            .delete(`/car/${id}`)
            .then(res => res.data),
};