import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQuality } = useQualities();
    const { name, color } = getQuality(id);
    const classes = `badge bg-${color} m-1`;

    return <span className={classes}>{name}</span>;
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Qualitie;
