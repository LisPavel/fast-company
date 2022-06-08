import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ ids }) => {
    const { getQuality, isLoading } = useQualities();
    const qualities = isLoading ? [] : ids.map((id) => getQuality(id));
    return (
        <>
            {qualities.map((q) => (
                <Qualitie key={q._id} {...q} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default QualitiesList;
