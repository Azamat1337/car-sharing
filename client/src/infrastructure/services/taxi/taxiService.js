import api from '../api';

export const taxiService = {
    createRide: (payload) => api.post('/taxi', payload).then(res => res.data),
    fetchAllRides: () => api.get('/taxi').then(res => res.data),
    fetchMyRides: () => api.get('/taxi/my').then(res => res.data),
    fetchAvailableRides: () => api.get('/taxi/available').then(res => res.data),
    joinRide: (rideId) => api.post(`/taxi/${rideId}/join`).then(res => res.data),
    leaveRide: (rideId) => api.delete(`/taxi/${rideId}/join`).then(res => res.data),
    changeRideStatus: (rideId, status) => api.put(`/taxi/${rideId}/status`, { status }).then(res => res.data),
    completeRide: (rideId) => api.post(`/taxi/${rideId}/complete`).then(res => res.data),
};