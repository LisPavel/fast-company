import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        commentsRequested(state) {
            state.isLoading = true;
        },
        commentsReceived(state, action) {
            state.isLoading = false;
            state.error = null;
            state.entities = action.payload;
        },
        commentsRequestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer: commentsReducer } = commentsSlice;

const { commentsReceived, commentsRequestFailed, commentsRequested } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message ?? error.error));
    }
};

export const getComments = () => (state) => {
    return state.comments.entities;
};
export const getCommentsLoadingStatus = () => (state) => {
    return state.comments.isLoading;
};
export const getCommentById = (id) => (state) => {
    if (state.comments.entities == null) return null;
    return state.comments.entities.find((p) => p._id === id);
};

export default commentsReducer;
