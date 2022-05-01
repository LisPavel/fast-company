import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ items }) => {
  const location = useLocation();

  const getClassName = (path) =>
    `nav-link${
      path === `/${location.pathname.split("/")[1]}` ? " active" : ""
    }`;

  return (
    <ul className="nav nav-tabs">
      {Object.keys(items).map((item) => (
        <li className="nav-item" key={item}>
          <Link className={getClassName(item)} to={items[item].path}>
            {items[item].name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

NavBar.propTypes = {
  items: PropTypes.object.isRequired,
};

export default NavBar;
