import React from "react";
import PropTypes from "prop-types";
import CardWrapper from "../common/CardWrapper";
import { Link, useLocation } from "react-router-dom";

const UserCard = ({ name, profession, rate }) => {
    const location = useLocation();

    return (
        <CardWrapper className="mb-3">
            <Link
                type="button"
                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                to={`${location.pathname}/edit`}
            >
                <i className="bi bi-gear"></i>
            </Link>
            <div className=" d-flex flex-column align-items-center text-center position-relative">
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="150"
                />
                <div className="mt-3">
                    <h4>{name}</h4>
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
                        <span className="ms-2">{rate}</span>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};

UserCard.propTypes = {
    name: PropTypes.string,
    profession: PropTypes.object,
    rate: PropTypes.number,
};

export default UserCard;
