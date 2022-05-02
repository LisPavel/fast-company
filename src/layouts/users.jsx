import React from "react";
import { Switch, Route } from "react-router-dom";

import User from "../components/user";
import UsersList from "../components/usersList";

const Users = () => {
  return (
    <Switch>
      <Route path="/users/:id" component={User} />
      <Route path="/users" component={UsersList} />
    </Switch>
  );
};

export default Users;
