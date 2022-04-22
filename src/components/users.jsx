import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import api from "../api";

import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import UsersTable from "./usersTable";

import { paginate } from "../utils/paginate";

const Users = (props) => {
  const { users, ...rest } = props;
  const pageSize = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

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

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf?._id)
    : users;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  const usersCount = filteredUsers.length;

  const renderUsersTable = () =>
    usersCount > 0 && (
      <UsersTable
        users={usersCrop}
        onSort={handleSort}
        selectedSort={sortBy}
        {...rest}
      />
    );

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
};

export default Users;
