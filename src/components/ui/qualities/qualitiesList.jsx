import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ ids }) => {
    const { isLoading } = useQualities();
    return <>{!isLoading && ids.map((id) => <Qualitie key={id} id={id} />)}</>;
};

QualitiesList.propTypes = {
    ids: PropTypes.arrayOf(
        PropTypes.shape({ _id: PropTypes.string.isRequired })
    ).isRequired,
};
export default QualitiesList;
