import React, { useState } from "react";
import API from "../api";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const formatPersonsTxt = (users) => {
    return `человек${users.length >= 2 && users.length <= 4 ? "а" : ""}`;
  };

  const getTitleText = (users) => {
    return users.length > 0
      ? `${users.length} ${formatPersonsTxt(users)} тусанет с тобой сегодня`
      : "Никто с тобой не тусанет";
  };

  const renderTitle = () => {
    const titleTxt = getTitleText(users);

    const classes = `badge bg-${users.length > 0 ? "primary" : "danger"}`;
    return (
      <h2>
        <span className={classes}>{titleTxt}</span>
      </h2>
    );
  };

  const renderUsersTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
      </table>
    );
  };
  return (
    <>
      {renderTitle()}
      {renderUsersTable()}
    </>
  );
};

export default Users;
