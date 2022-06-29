import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        error: null,
        isLoading: true,
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersReceived(state, action) {
            state.isLoading = false;
            state.entities = action.payload;
            state.error = null;
        },
        usersRequestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer: usersReducer } = usersSlice;

const { usersReceived, usersRequestFailed, usersRequested } = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message ?? error.error));
    }
};

export const getUsers = () => (state) => {
    return state.users.entities;
};
export const getUsersLoadingStatus = () => (state) => {
    return state.users.isLoading;
};
export const getUserById = (id) => (state) => {
    return state.users.entities.find((u) => u._id === id);
};

export default usersReducer;
