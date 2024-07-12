import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/';

const register = (email, password, role) => {
    return axios.post(API_URL + 'register', { email, password, role });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(API_URL + 'logout');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
