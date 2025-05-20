import api from '../api';

export const postService = {
    fetchAll: ({ page = 1, limit = 10 } = {}) =>
        api
            .get('/posts', { params: { page, limit } })
            .then(res => res.data),

    create: ({ title, excerpt, content }) => {
        return api
            .post('/posts', { title, excerpt, content })
            .then(res => res.data);
    },

    fetchById: id =>
        api
            .get(`/posts/${id}`)
            .then(res => res.data),

    update: (id, { title, excerpt, content }) => {

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (content !== undefined) updateData.content = content;

        return api
            .put(`/posts/${id}`, updateData)
            .then(res => res.data);
    },

    remove: id =>
        api
            .delete(`/posts/${id}`)
            .then(res => res.data),
};