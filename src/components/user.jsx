import React from "react";
import Quality from "./quality";

const User = (props) => {
  const { onUserRemove } = props;
  const handleUserRemove = () => onUserRemove?.(props._id);

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {props.qualities.map((q) => (
          <Quality key={q._id} {...q} />
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
