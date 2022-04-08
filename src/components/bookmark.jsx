import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
  const { onBookmarkClick } = props;

  const btnStyle = props.bookmarked ? "primary" : "outline-secondary";

  const iconStyle = props.bookmarked ? "-heart-fill" : "";

  return (
    <button className={`btn btn-${btnStyle} btn-sm`} onClick={onBookmarkClick}>
      <i className={`bi bi-bookmark${iconStyle}`}></i>
    </button>
  );
};

Bookmark.propTypes = {
  bookmarked: PropTypes.bool.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default Bookmark;
