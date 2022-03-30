import React from "react";

const User = (props) => {
  const { onUserRemove } = props;
  const handleUserRemove = () => onUserRemove?.(props._id);

  const renderUserQuality = (quality) => {
    const classes = `badge bg-${quality.color} m-1`;
    return (
      <span key={quality._id} className={classes}>
        {quality.name}
      </span>
    );
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.qualities.map((q) => renderUserQuality(q))}</td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{`${props.rate}/5`}</td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={handleUserRemove}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
