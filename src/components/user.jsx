import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
  const { onUserRemove, onUserBookmarkToggle } = props;

  const handleUserRemove = () => onUserRemove?.(props._id);

  const handleBookmarkClick = () => onUserBookmarkToggle(props._id);

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {props.qualities.map((q) => (
          <Qualitie key={q._id} {...q} />
        ))}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{`${props.rate}/5`}</td>
      <td>
        <Bookmark
          bookmarked={props.bookmark}
          onBookmarkClick={handleBookmarkClick}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={handleUserRemove}
          // disabled={props.bookmark}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  onUserRemove: PropTypes.func.isRequired,
  onUserBookmarkToggle: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string.isRequired })
  ).isRequired,
  profession: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
};

export default User;
