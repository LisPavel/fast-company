import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserEditRoute from "../components/routes/userEditRoute";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const pages = [
        { path: "/users/:id/edit", component: UserEditPage, id: "editPage" },
        { path: "/users/:id", component: UserPage },
        { path: "/users", component: UsersListPage },
    ];
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);
    if (!dataStatus) return "Loading";

    return (
        <Switch>
            {pages.map((pageCfg) =>
                pageCfg.id !== "editPage" ? (
                    <Route {...pageCfg} key={pageCfg.path} />
                ) : (
                    <UserEditRoute {...pageCfg} key={pageCfg.path} />
                )
            )}
        </Switch>
    );
};

export default Users;
