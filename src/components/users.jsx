import React, { useState } from "react";
import API from "../api";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const formatPersonsTxt = (users) => {
        return `человек${users.length >= 2 && users.length <= 4 ? "а" : ""}`;
    };

    const getTitleText = (users) => {
        return users.length > 0
            ? `${users.length} ${formatPersonsTxt(
                  users,
              )} тусанет с тобой сегодня`
            : "Никто с тобой не тусанет";
    };

    const renderTitle = () => {
        const titleTxt = getTitleText(users);

        const classes = `badge bg-${users.length > 0 ? "primary" : "danger"}`;
        return (
            <h2>
                <span className={classes}>{titleTxt}</span>
            </h2>
        );
    };
    return <>{renderTitle()}</>;
};

export default Users;
