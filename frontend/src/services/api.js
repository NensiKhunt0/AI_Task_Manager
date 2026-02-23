import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log("API_URL", API_URL);
const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const signupUser = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
};

export const getTasks = async () => {
    const response = await api.get('/tasks');
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

export const getAiSuggestions = async () => {
    const response = await api.post('/ai/suggest');
    return response.data;
};

export default api;
