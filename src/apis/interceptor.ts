import axios, { AxiosError } from "axios";

const interceptor = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

const onRequest = (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const onResponse = (response: any) => {
    // Handle successful responses here if needed
    return response;
};

const onErrorResponse = (error: AxiosError) => {
    // Handle errors here
    throw error;
};

interceptor.interceptors.request.use(onRequest);
interceptor.interceptors.response.use(onResponse, onErrorResponse);

export default interceptor;
