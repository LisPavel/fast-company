import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    const [isOpen, setOpen] = useState(false);
    const currentUser = useSelector(getCurrentUserData());
    const toggleMenu = () => {
        setOpen((ps) => !ps);
    };

    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    className="img-responsive rounded-circle"
                    height="40px"
                />
            </div>
            <div className={`w-100 dropdown-menu${isOpen ? " show" : ""}`}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
