import React /* , { useState } */ from "react";

import User from "./user";
import SearchStatus from "./searchStatus";

const Users = (props) => {
  const { users, onUserRemove, onUserBookmarkToggle } = props;

  const renderUsersTable = () => {
    return (
      users.length > 0 && (
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
              <User
                key={user._id}
                {...user}
                onUserRemove={onUserRemove}
                onBookmarkToggle={onUserBookmarkToggle}
              />
            ))}
          </tbody>
        </table>
      )
    );
  };
  return (
    <>
      <SearchStatus usersAmount={users.length} />
      {renderUsersTable()}
    </>
  );
};

export default Users;
