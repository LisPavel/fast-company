import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
} from "../../../store/qualities";

const QualitiesList = ({ ids }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
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
