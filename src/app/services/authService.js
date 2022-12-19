import axios from "axios";
import localStorageService from "./localStorageService";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.apiEndPoint + "auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post("signUp", {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    login: async ({ email, password }) => {
        const url = "signInWithPassword";
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    refreshToken: async () => {
        const { data } = await httpAuth.post(`token`, {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken(),
        });
        return data;
    },
};

export default authService;
