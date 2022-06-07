import React from "react";

import PropTypes from "prop-types";
const CardWrapper = ({ children, ...rest }) => {
    rest.className = `card ${rest.className ?? ""}`;
    return (
        <div {...rest}>
            <div className="card-body">{children}</div>
        </div>
    );
};

CardWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default CardWrapper;
