import React from "react";
import { Switch, Route } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditRoute from "../components/routes/userEditRoute";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const pages = [
        { path: "/users/:id/edit", component: UserEditPage },
        { path: "/users/:id", component: UserPage },
        { path: "/users", component: UsersListPage },
    ];
    return (
        <UserProvider>
            <Switch>
                {pages.map((pageCfg) =>
                    pageCfg.path !== "/users/:id/edit" ? (
                        <Route {...pageCfg} key={pageCfg.path} />
                    ) : (
                        <UserEditRoute {...pageCfg} key={pageCfg.path} />
                    )
                )}
            </Switch>
        </UserProvider>
    );
};

export default Users;
