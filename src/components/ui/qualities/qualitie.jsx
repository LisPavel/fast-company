import React from "react";
import PropTypes from "prop-types";

const Qualitie = (props) => {
    const classes = `badge bg-${props.color} m-1`;

    return <span className={classes}>{props.name}</span>;
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Qualitie;
