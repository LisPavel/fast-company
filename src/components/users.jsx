import React, { useState } from "react";

import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";

import { paginate } from "../utils/paginate";

const Users = (props) => {
  const { users, onUserRemove, onUserBookmarkToggle } = props;
  const usersCount = users.length;
  const pageSize = 4;

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

export default Users;
