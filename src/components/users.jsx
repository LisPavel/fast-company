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

  const renderUserQuality = (quality) => {
    const classes = `badge bg-${quality.color} m-1`;
    return (
      <span key={quality._id} className={classes}>
        {quality.name}
      </span>
    );
  };

  const renderUserRow = (user) => {
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.qualities.map((q) => renderUserQuality(q))}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{`${user.rate}/5`}</td>
        <td>
          <button className="btn btn-sm btn-danger">delete</button>
        </td>
      </tr>
    );
  };

  const renderUsersTable = () => {
    return (
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
        <tbody>{users.map((user) => renderUserRow(user))}</tbody>
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
