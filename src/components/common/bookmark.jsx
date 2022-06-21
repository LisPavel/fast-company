import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmarked, ...rest }) => {
    const btnStyle = bookmarked ? "primary" : "outline-secondary";

    const iconStyle = bookmarked ? "-heart-fill" : "";

    return (
        <button className={`btn btn-${btnStyle} btn-sm`} {...rest}>
            <i className={`bi bi-bookmark${iconStyle}`}></i>
        </button>
    );
};

Bookmark.defaultProps = {
    bookmarked: false,
};

Bookmark.propTypes = {
    bookmarked: PropTypes.bool.isRequired,
};

export default Bookmark;
