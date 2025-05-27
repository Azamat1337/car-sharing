import api from '../api';

export const postService = {
    fetchAll: ({ page = 1, limit = 10 } = {}) =>
        api
            .get('/post', { params: { page, limit } })
            .then(res => res.data),

    create: ({ title, excerpt, content, image }) => {
        const formData = new FormData();
        formData.append('title', title);
        if (excerpt) formData.append('excerpt', excerpt);
        formData.append('content', content);
        if (image) formData.append('image', image);
        return api
            .post('/post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => res.data);
    },

    fetchById: id =>
        api
            .get(`/post/${id}`)
            .then(res => res.data),

    update: (id, { title, excerpt, content }) => {
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (content !== undefined) updateData.content = content;
        return api
            .put(`/post/${id}`, updateData)
            .then(res => res.data);
    },

    remove: id =>
        api
            .delete(`/post/${id}`)
            .then(res => res.data),
};

