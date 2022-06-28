import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
    const classes = `badge bg-${color} m-1`;
    return <span className={classes}>{name}</span>;
};

Qualitie.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default Qualitie;
