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
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    return () => console.log("unmount");
  }, []);

  useEffect(() => setCurrentPage(1), [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf?._id)
    : users;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  const usersCount = filteredUsers.length;

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
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersAmount={usersCount} />
        {renderUsersTable()}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={usersCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onUserBookmarkToggle: PropTypes.func.isRequired,
};

export default Users;
