/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";
import { generateAuthError } from "../utils/errors";
import history from "../utils/history";
import { randomInt } from "../utils/number";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          error: null,
          isLoading: true,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false,
      }
    : {
          entities: null,
          error: null,
          isLoading: false,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false,
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
            state.error = null;
        },
        usersReceived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSucceed(state, action) {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed(state, action) {
            state.error = action.payload;
        },
        userCreated(state, action) {
            if (state.entities) state.entities.push(action.payload);
        },
        userLoggedOut(state) {
            state.entities = null;
            state.auth = null;
            state.dataLoaded = false;
            state.isLoggedIn = false;
        },
        userUpdated(state, action) {
            const index = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[index] = action.payload;
        },
        userUpdateFailed(state, action) {
            state.error = action.payload;
        },
        authRequested(state) {
            state.error = null;
        },
    },
});

const { actions, reducer: usersReducer } = usersSlice;

const {
    usersReceived,
    usersRequestFailed,
    usersRequested,
    authRequestSucceed,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdateFailed,
    userUpdated,
    authRequested,
} = actions;

// const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message ?? error.error));
    }
};

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const logIn = ({ payload, redirect }) => {
    return async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSucceed({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            const errorMessage =
                generateAuthError({ code, message }) ??
                error.message ??
                error.error;
            dispatch(authRequestFailed(errorMessage));
        }
    };
};

export const signUp = ({ email, password, ...rest }) => {
    return async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSucceed({ userId: data.localId }));
            dispatch(
                createUser({
                    ...rest,
                    email,
                    _id: data.localId,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                })
            );
        } catch (error) {
            const { code, message } = error.response.data.error;
            const errorMessage =
                generateAuthError({ code, message }) ??
                error.message ??
                error.error;
            dispatch(authRequestFailed(errorMessage));
        }
    };
};

function createUser(payload) {
    return async (dispatch) => {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFailed(error.message ?? error.error));
        }
    };
}

export const updateUser = (data) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(data);
        dispatch(userUpdated(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message ?? error.error));
    }
};

export const getUsersList = () => (state) => {
    return state.users.entities;
};
export const getUsersLoadingStatus = () => (state) => {
    return state.users.isLoading;
};
export const getUserById = (id) => (state) => {
    if (state.users.entities == null) return null;
    return state.users.entities.find((u) => u._id === id);
};
export const getIsLoggedIn = () => (state) => {
    return state.users.isLoggedIn;
};
export const getDataStatus = () => (state) => {
    return state.users.dataLoaded;
};
export const getCurrentUserId = () => (state) => {
    return state.users.auth.userId;
};
export const getCurrentUserData = () => (state) => {
    return state.users.entities?.find((u) => u._id === state.users.auth.userId);
};
export const getAuthError = () => (state) => {
    return state.users.error;
};

export default usersReducer;
