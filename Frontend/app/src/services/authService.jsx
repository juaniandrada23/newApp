import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

const register = (email, password, role) => {
    return axios.post(`${API_URL}/register`, { email, password, role });
};

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';  // Redirigir al login
};

const authService = {
    register,
    login,
    logout,
};

export default authService;

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            authService.logout();
        }
        return Promise.reject(error);
    }
);
