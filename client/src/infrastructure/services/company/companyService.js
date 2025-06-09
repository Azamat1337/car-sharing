import api from '../api.js';

export const companyService = {
    fetchAll: () => {
        return api.get('/companies')
            .then(res => res.data);
    },

    fetchById: (id) => {
        return api.get(`/companies/${id}`)
            .then(res => res.data);
    },

    create: ({ name, description, foundedYear }) => {
        return api.post('/companies', { name, description, foundedYear })
            .then(res => res.data);
    },

    update: (id, { name, description, foundedYear }) => {
        return api.put(`/companies/${id}`, { name, description, foundedYear })
            .then(res => res.data);
    },

    remove: (id) => {
        return api.delete(`/companies/${id}`)
            .then(res => res.data);
    },
};