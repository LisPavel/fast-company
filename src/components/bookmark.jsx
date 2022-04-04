import React from "react";

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

export default Bookmark;
