import axios from 'axios';
import * as config from './helpers/config.js';
import * as auth from './helpers/authorization.js';

export { axiosInstance };

const headers = {
    Authorization: auth.readAuthToken(),
    'Content-Type': config.contentType,
    accept: config.contentType
};
const axiosConfig = {
    baseURL: config.url.api,
    timeout: config.requestTimeout,
    headers
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken  = localStorage.getItem('refresh_token');
                const response = await axiosInstance.post('auth/jwt/refresh/', { refreshToken });
                const { token } = response.data;

                localStorage.setItem('access_token', token);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch(error) {

                auth.clearAuthTokens();
            }
        }

        return Promise.reject(error);
    }
)