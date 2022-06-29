import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professionService";
import { isOutdated } from "../utils/date";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
};

const professionsSlice = createSlice({
    name: "professions",
    initialState,
    reducers: {
        professionsRequested(state) {
            state.isLoading = true;
        },
        professionsReceived(state, action) {
            state.isLoading = false;
            state.error = null;
            state.entities = action.payload;
            state.lastFetch = Date.now();
        },
        professionsRequestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { actions, reducer: professionsReducer } = professionsSlice;

const { professionsReceived, professionsRequestFailed, professionsRequested } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (!isOutdated(lastFetch, 10)) return;

    dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionsReceived(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message ?? error.error));
    }
};

export const getProfessions = () => (state) => {
    return state.professions.entities;
};
export const getProfessionsLoadingStatus = () => (state) => {
    return state.professions.isLoading;
};
export const getProfessionById = (id) => (state) => {
    return state.professions.entities.find((p) => p._id === id);
};

export default professionsReducer;
