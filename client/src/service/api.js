import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';

const API_URL = 'http://localhost:8000';

// ✅ frontend-safe token access
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(error);
    }
);

///////////////////////
// If success -> return { isSuccess:true, data }
// if fail -> return { isFailure:true, status, msg, code }
//////////////////////
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

///////////////////////
// Error formatter (kept for later UI use)
//////////////////////
const processError = (error) => {
    if (error.response) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: error.response.status
        };
    } else if (error.request) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: ""
        };
    } else {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers: body instanceof FormData
                ? { "content-type": "multipart/form-data" }
                : {},
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
}

export { API };
