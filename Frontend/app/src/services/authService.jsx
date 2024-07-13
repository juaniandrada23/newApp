import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/';

// Configurar Axios para interceptar respuestas y manejar expiración de token
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token ha expirado o es inválido
            localStorage.removeItem('user');
            window.location.href = '/login'; // Redirigir a la página de login
        }
        return Promise.reject(error);
    }
);

const register = (email, password, role) => {
    return axiosInstance.post('register', { email, password, role });
};

const login = (email, password) => {
    return axiosInstance.post('login', { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
    return axiosInstance.post('logout');
};

const authService = {
    register,
    login,
    logout
};

export { axiosInstance };
export default authService;
