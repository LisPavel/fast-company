import React from "react";
import PropTypes from "prop-types";

// import api from "../../../api";
import { formatDate } from "../../../utils/date";
import { useUsers } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ userId, content, createdAt, onDelete, _id }) => {
    const { getUserById } = useUsers();
    const { currentUser } = useAuth();
    const user = getUserById(userId);

    const handleClick = () => {
        onDelete(_id);
    };

    const renderComment = () => {
        if (!user) return <>Loading...</>;
        return (
            <div className="d-flex flex-start">
                <img
                    src={user.image}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                />
                <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                {user.name}{" "}
                                <span className="small">
                                    {formatDate(createdAt)}
                                </span>
                            </p>
                            {currentUser._id === userId && (
                                <button
                                    className="btn btn-sm text-primary d-flex align-items-center"
                                    onClick={handleClick}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </div>
                        <p className="small mb-0">{content}</p>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">{renderComment()}</div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    onDelete: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
};

export default Comment;
