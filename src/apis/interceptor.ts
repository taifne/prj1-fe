import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


const interceptor = axios.create(
    {
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json"
        }
    }
)

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = token
    }

    return config
}

const onErrorResponse = (error: AxiosError | Error) => {
    throw error
}

interceptor.interceptors.request.use(onRequest)
interceptor.interceptors.response.use(null, onErrorResponse)

export default interceptor 