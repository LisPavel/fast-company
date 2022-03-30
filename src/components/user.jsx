import React from "react";
import Qualitie from "./qualitie";

const User = (props) => {
  const { onUserRemove } = props;
  const handleUserRemove = () => onUserRemove?.(props._id);

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
        <button className="btn btn-sm btn-danger" onClick={handleUserRemove}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
