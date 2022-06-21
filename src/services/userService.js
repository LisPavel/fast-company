import httpService from "./httpService";
import localStorageService from "./localStorageService";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndPoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
};

export default userService;
