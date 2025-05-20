import api from '../api.js';

export const brandService = {
    fetchAll: () => {
        return api.get('/brands')
            .then(res => res.data);
    },

    create: (name) => {
        return api.post('/brands', { name })
            .then(res => res.data);
    },

    update: (id, name) => {
        return api.put(`/brands/${id}`, { name })
            .then(res => res.data);
    },

    remove: (id) => {
        return api.delete(`/brands/${id}`)
            .then(res => res.data);
    },
};
