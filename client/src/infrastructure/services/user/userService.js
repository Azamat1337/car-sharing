import api from '../api.js';

export const userService = {
    register: ({ username, email, password }) =>
        api
            .post('/auth/register', { username, email, password })
            .then(res => ({
                accessToken:  res.data.accessToken,
                refreshToken: res.data.refreshToken
            })),

    login: ({ email, password }) =>
        api
            .post('/auth/login', { email, password })
            .then(res => ({
                accessToken:  res.data.accessToken,
                refreshToken: res.data.refreshToken
            })),

    getProfile: () =>
        api
            .get('/auth/profile')
            .then(res => res.data),

    logout: (refreshToken) =>
        api.post('/auth/logout', { refreshToken }),

    refreshToken: ({ refreshToken }) =>
        api
            .post('/auth/refresh', { refreshToken })
            .then(res => res.data),
};
