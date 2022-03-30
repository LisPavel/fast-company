import React, { useState } from "react";
import API from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleUserRemove = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

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
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} {...user} onUserRemove={handleUserRemove} />
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
