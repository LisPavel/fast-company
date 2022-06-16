import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorageService";

const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
    async (config) => {
        if (configFile.isFireBase) {
            const isSlashEnd = /\/$/gi.test(config.url);
            config.url = `${
                isSlashEnd ? config.url.slice(0, -1) : config.url
            }.json`;
            const expiresDate = localStorageService.getExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                try {
                    const { data } = await httpAuth.post(
                        `token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
                        {
                            grant_type: "refresh_token",
                            refresh_token: refreshToken,
                        }
                    );
                    console.log("refresh", data);
                    localStorageService.setTokens({
                        refreshToken: data.refresh_token,
                        idToken: data.id_token,
                        localId: data.user_id,
                        expiresIn: data.expiresIn,
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

function transformData(data) {
    return data && !data._id ? Object.keys(data).map((k) => data[k]) : data;
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            toast.error("Something was wrong. Try it later");
            console.error(error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
};

export default httpService;
