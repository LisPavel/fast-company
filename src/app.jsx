import React, { useState } from "react";
import Users from "./components/users";
import API from "./api";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

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
      <Users
        users={users}
        onUserRemove={handleUserRemove}
        onUserBookmarkToggle={handleUserBookmarkToggle}
      />
    </>
  );
};

export default App;
