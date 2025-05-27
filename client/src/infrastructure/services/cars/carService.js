import api from '../api';

export const carService = {
    fetchAll: ({ page = 1, limit = 10, brandId, year, model, available } = {}) =>
        api
            .get('/car', { params: { page, limit, brandId, year, model, available } })
            .then(res => res.data),

    fetchById: (id) =>
        api
            .get(`/car/${id}`)
            .then(res => res.data),

    create: ({ model, year, brandId, available = true, img, info }) => {
        const formData = new FormData();
        formData.append('model', model);
        formData.append('year', year);
        formData.append('brandId', brandId);
        formData.append('available', available);
        if (img) formData.append('img', img);
        if (info) formData.append('info', JSON.stringify(info));
        return api
            .post('/car', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => res.data);
    },

    update: (id, { model, year, brandId, available }) => {
        const updateData = {};
        if (model !== undefined) updateData.model = model;
        if (year !== undefined) updateData.year = year;
        if (brandId !== undefined) updateData.brandId = brandId;
        if (available !== undefined) updateData.available = available;
        return api
            .put(`/car/${id}`, updateData)
            .then(res => res.data);
    },

    remove: (id) =>
        api
            .delete(`/car/${id}`)
            .then(res => res.data),
};