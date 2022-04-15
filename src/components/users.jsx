import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../api";

import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";

import { paginate } from "../utils/paginate";

const Users = (props) => {
  const { users, onUserRemove, onUserBookmarkToggle } = props;
  const usersCount = users.length;
  const pageSize = 4;

  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    return () => console.log("unmount");
  }, []);

  const handleProfessionSelect = (params) => {
    console.log(params);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const usersCrop = paginate(users, currentPage, pageSize);

  const renderUsersTable = () => {
    return (
      usersCount > 0 && (
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
            {usersCrop.map((user) => (
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
      {professions && (
        <GroupList items={professions} onItemSelect={handleProfessionSelect} />
      )}
      <SearchStatus usersAmount={users.length} />
      {renderUsersTable()}
      <Pagination
        itemsCount={usersCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onUserBookmarkToggle: PropTypes.func.isRequired,
};

export default Users;
