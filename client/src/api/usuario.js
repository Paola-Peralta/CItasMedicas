
import axios from 'axios';

const API_URL = 'http://localhost:8000/usuario';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/token/`, credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
};