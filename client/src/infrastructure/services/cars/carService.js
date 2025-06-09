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

    create: ({ model, year, brandId, companyId, available = true, img, info, rentalType, dailyPrice, hourlyPrice }) => {
        const formData = new FormData();
        formData.append('model', model);
        formData.append('year', year);
        formData.append('brandId', brandId);
        if (companyId) formData.append('companyId', companyId); // Добавляем companyId
        formData.append('available', available);
        if (img) formData.append('img', img);
        if (info) formData.append('info', JSON.stringify(info));
        if (rentalType) formData.append('rentalType', rentalType);
        if (dailyPrice !== undefined) formData.append('dailyPrice', dailyPrice);
        if (hourlyPrice !== undefined) formData.append('hourlyPrice', hourlyPrice);
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