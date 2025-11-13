import axios, { AxiosError, type AxiosResponse } from 'axios';

const API = 'http://localhost:4000/api/';

const axiosApi = axios.create({
    baseURL: API,
});

axiosApi.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);
axiosApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/';
        }
        return Promise.reject(error);
    },
);

export { axiosApi };