import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = ({ items }) => {
    const location = useLocation();

    const getClassName = (path) =>
        `nav-link${
            path === `/${location.pathname.split("/")[1]}` ? " active" : ""
        }`;

    const { currentUser } = useAuth();
    const renderItem = ({ path, data }) => {
        return (
            <li className="nav-item" key={path}>
                <Link className={getClassName(path)} to={path}>
                    {data.name}
                </Link>
            </li>
        );
    };
    function renderItems() {
        return Object.keys(items)
            .filter((item) => item !== "/login")
            .map((item) => {
                const current = items[item];
                if (current.name == null) return null;
                if (current.onLoggedIn == null) {
                    return renderItem({ path: item, data: current });
                }
                return current.onLoggedIn
                    ? currentUser && renderItem({ path: item, data: current })
                    : !currentUser && renderItem({ path: item, data: current });
            });
    }
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">{renderItems()}</ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            {items["/login"].name}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    items: PropTypes.object.isRequired,
};

export default NavBar;
