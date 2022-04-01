import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
  const { onUserRemove, onBookmarkToggle } = props;

  const handleUserRemove = () => onUserRemove?.(props._id);

  const handleBookmarkClick = () => onBookmarkToggle(props._id);

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

export default User;
