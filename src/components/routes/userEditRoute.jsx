import React from "react";
import { Redirect, Route, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../hooks/useAuth";

const UserEditRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    const { id } = useParams();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (id !== currentUser._id) {
                    return (
                        <Redirect
                            to={{
                                pathname: `/users/${currentUser._id}/edit`,
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
