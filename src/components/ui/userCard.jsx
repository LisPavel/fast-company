import React from "react";
import PropTypes from "prop-types";
import CardWrapper from "../common/CardWrapper";
import { Link, useLocation } from "react-router-dom";
import { useProfessions } from "../../hooks/useProfessions";
import { useAuth } from "../../hooks/useAuth";

const UserCard = ({ user }) => {
    const location = useLocation();
    const { getProfession } = useProfessions();

    const profession = getProfession(user.profession);

    const { currentUser } = useAuth();

    return (
        <CardWrapper className="mb-3">
            {currentUser._id === user._id && (
                <Link
                    type="button"
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    to={`${location.pathname}/edit`}
                >
                    <i className="bi bi-gear"></i>
                </Link>
            )}

            <div className=" d-flex flex-column align-items-center text-center position-relative">
                <img
                    src={user.image}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="150"
                />
                <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{profession.name}</p>
                    <div className="text-muted">
                        <i
                            className="bi bi-caret-down-fill text-primary"
                            role="button"
                        ></i>
                        <i
                            className="bi bi-caret-up text-secondary"
                            role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};

UserCard.propTypes = {
    user: PropTypes.object,
};

export default UserCard;
