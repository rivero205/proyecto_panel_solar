export const API_URL = 'http://localhost:4500/api';

export const endpoints = {
    getAllData: `${API_URL}/datos`,
    getStationData: (stationId) => `${API_URL}/datos/${stationId}`,
    getLatestReadings: `${API_URL}/ultimas-lecturas`,
};