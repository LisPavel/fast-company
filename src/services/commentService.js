import httpService from "./httpService";

const commentEndPoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commentEndPoint + payload._id,
            payload
        );
        return data;
    },
};

export default commentService;
