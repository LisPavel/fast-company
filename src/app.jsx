import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

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

  return (
    <>
      {users && (
        <Users
          users={users}
          onUserRemove={handleUserRemove}
          onUserBookmarkToggle={handleUserBookmarkToggle}
        />
      )}
    </>
  );
};

export default App;
