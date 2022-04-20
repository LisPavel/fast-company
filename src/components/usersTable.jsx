import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UsersTable = (props) => {
  const { users, ...rest } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Профессия</th>
          <th>Встретился, раз</th>
          <th>Оценка</th>
          <th>Избранное</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User {...rest} key={user._id} {...user} />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onUserBookmarkToggle: PropTypes.func.isRequired,
};

export default UsersTable;
