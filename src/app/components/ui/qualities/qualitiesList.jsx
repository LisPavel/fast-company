import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList,
} from "../../../store/qualities";

const QualitiesList = ({ ids }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => dispatch(loadQualitiesList()), []);

    if (isLoading) {
        return "Loading...";
    }
    const qualitiesList = useSelector(getQualitiesByIds(ids));
    return (
        <>
            {qualitiesList.map((q) => (
                <Qualitie key={q._id} {...q} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default QualitiesList;
