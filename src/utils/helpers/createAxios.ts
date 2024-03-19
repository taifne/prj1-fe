import axios from "axios";
import * as jwtDecode from 'jwt-decode';
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";
import { updateJWT, logout } from "../../store/slices/auth";

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRrefreshed(token) {
  subscribers.map(cb => cb(token));
}

const refreshToken = async (dispatch) => {
    try {
        if (!isRefreshing) {
            isRefreshing = true;
            const res = await axios.post(`${BASE_URL}/auth/refresh`, {}, {
                withCredentials: true,
            });
            isRefreshing = false;
            onRrefreshed(res.data.payload);
            return res.data;
        } else {
            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    resolve({ payload: token });
                });
            });
        }
    } catch (error) {
        isRefreshing = false;
        toast.error('Login session has expired');
            dispatch(logout());
    }
};


const createAxios = (accessToken, dispatch) => {

    const newInstance = axios.create();
    
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            config.headers["Authorization"] = "Bear " + accessToken;
            if (accessToken) {
                const decodedToken = jwtDecode.jwtDecode(accessToken);
                if (decodedToken.exp < date.getTime() / 1000) {

                    const data = await refreshToken(dispatch);
                    if (data.payload) {
                        dispatch(updateJWT(data.payload));
                    }
                    config.headers["Authorization"] = "Bear " + data.payload;
                }
            }
            config.withCredentials = true;
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
export default createAxios;