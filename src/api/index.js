import axios from "axios";

const api = axios.create({
    baseURL: "https://codeoasis.herokuapp.com/"
});

export const setToken = (token) => {
    if (token) {
        localStorage.setItem('auth-token', token)
        api.interceptors.request.use(
            function (config) {
                config.headers["auth-token"] = token;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    } else {
        localStorage.removeItem('auth-token');
        api.interceptors.request.use(
            function (config) {
                config.headers["auth-token"] = null;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    }
}

export default api;