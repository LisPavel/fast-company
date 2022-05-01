import React, { useState, useEffect } from "react";
import _ from "lodash";

import api from "../api";

import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import UsersTable from "./usersTable";

import { paginate } from "../utils/paginate";
import { Switch, Route } from "react-router-dom";
import User from "./user";

const Users = () => {
  // const { users, ...rest } = props;
  const pageSize = 8;

  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "", order: "" });

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    return () => console.log("unmount");
  }, []);

  useEffect(() => setCurrentPage(1), [selectedProf]);

  const handleUserRemove = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleUserBookmarkToggle = (userId) => {
    setUsers((prevState) =>
      prevState.map((user) => ({
        ...user,
        bookmark: userId === user._id ? !user.bookmark : user.bookmark,
      }))
    );
  };

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

  if (!users) return "loading...";

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf?._id)
    : users;

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  const usersCount = filteredUsers.length;

  const renderUsersTable = () =>
    usersCount > 0 && (
      <UsersTable
        users={usersCrop}
        onSort={handleSort}
        selectedSort={sortBy}
        onDelete={handleUserRemove}
        onBookmarkToggle={handleUserBookmarkToggle}
      />
    );

  const renderUsersList = () => {
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

  return (
    <Switch>
      <Route path="/users/:id" component={User} />
      <Route path="/users" render={renderUsersList} />
    </Switch>
  );
};

export default Users;
