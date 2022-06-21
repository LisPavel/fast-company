import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../hooks/useAuth";

const UserEditRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    const editPath = `/users/${currentUser._id}/edit`;
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (editPath !== location.pathname) {
                    return (
                        <Redirect
                            to={{
                                pathname: editPath,
                                // state: { from: props.location },
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
