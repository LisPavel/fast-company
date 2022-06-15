import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../config.json";

const http = axios.create({ baseURL: configFile.apiEndPoint });

http.interceptors.request.use(
    (config) => {
        if (configFile.isFireBase) {
            const isSlashEnd = /\/$/gi.test(config.url);
            config.url = `${
                isSlashEnd ? config.url.slice(0, -1) : config.url
            }.json`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

function transformData(data) {
    return data ? Object.keys(data).map((k) => data[k]) : [];
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
