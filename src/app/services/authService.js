import axios from "axios";
import localStorageService from "./localStorageService";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post("accounts:signUp", {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    login: async ({ email, password }) => {
        const url = "accounts:signInWithPassword";
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    refreshToken: async () => {
        const { data } = await httpAuth.post(
            `token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
            {
                grant_type: "refresh_token",
                refresh_token: localStorageService.getRefreshToken(),
            }
        );
        return data;
    },
};

export default authService;
