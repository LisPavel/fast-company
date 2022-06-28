import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualityService";

const initialState = { entities: null, isLoading: true, error: null };

const qualitiesSlice = createSlice({
    initialState,
    name: "qualities",
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesReceived, qualitiesRequested, qualitiesRequestFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.get();
        dispatch(qualitiesReceived(content));
    } catch (error) {
        dispatch(qualitiesRequestFailed(error));
    }
};

export const getQualities = () => (state) => {
    return state.qualities.entities;
};
export const getQualitiesLoadingStatus = () => (state) => {
    return state.qualities.isLoading;
};
export const getQualitiesByIds = (ids) => (state) => {
    if (!state.qualities.entities) return [];
    const result = [];
    for (const id of ids) {
        for (const quality of state.qualities.entities) {
            if (id !== quality._id) continue;

            result.push(quality);
            break;
        }
    }
    return result;
};
export const getQualityById = (id) => (state) => {
    return state.qualities.entities.find((q) => q._id === id);
};

export default qualitiesReducer;
