import React from "react";
import { Switch, Route } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const pages = [
        { path: "/users/:id/edit", component: UserEditPage },
        { path: "/users/:id", component: UserPage },
        { path: "/users", component: UsersListPage },
    ];
    return (
        <Switch>
            {pages.map((pageCfg) => (
                <Route {...pageCfg} key={pageCfg.path} />
            ))}
        </Switch>
    );
};

export default Users;
