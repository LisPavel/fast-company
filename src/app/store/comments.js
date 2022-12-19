import { createAction, createSlice } from "@reduxjs/toolkit";
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
        commentCreated(state, action) {
            state.entities.push(action.payload);
        },
        commentCreationFailed(state, action) {
            state.error = action.payload;
        },
        commentRemoved(state, action) {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        commentRemoveFailed(state, action) {
            state.error = action.payload;
        },
    },
});

const { actions, reducer: commentsReducer } = commentsSlice;

const {
    commentsReceived,
    commentsRequestFailed,
    commentsRequested,
    commentCreated,
    commentCreationFailed,
    commentRemoveFailed,
    commentRemoved,
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message ?? error.error));
    }
};
export const createComment = (comment) => async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreationFailed(error.message ?? error.error));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (!content) {
            dispatch(commentRemoved(commentId));
        } else {
            console.log(content);
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message ?? error.error));
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
