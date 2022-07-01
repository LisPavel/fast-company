import React from "react";
import { Redirect, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserEditRoute = ({ component: Component, children, ...rest }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const { id } = useParams();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (id !== currentUserId) {
                    return (
                        <Redirect
                            to={{
                                pathname: `/users/${currentUserId}/edit`,
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

UserEditRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default UserEditRoute;
