import React from "react";
import { Switch, Route } from "react-router-dom";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    return (
        <Switch>
            <Route path="/users/:id" component={UserPage} />
            <Route path="/users" component={UsersListPage} />
        </Switch>
    );
};

export default Users;
