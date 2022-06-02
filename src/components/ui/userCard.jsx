import React from "react";
import CardWrapper from "../common/CardWrapper";

const UserCard = () => {
    return (
        <CardWrapper className="mb-3">
            <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                <i className="bi bi-gear"></i>
            </button>
            <div className=" d-flex flex-column align-items-center text-center position-relative">
                <img
                    src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                    className="rounded-circle"
                    width="150"
                />
                <div className="mt-3">
                    <h4>Джон Дориан</h4>
                    <p className="text-secondary mb-1">Доктор</p>
                    <div className="text-muted">
                        <i
                            className="bi bi-caret-down-fill text-primary"
                            role="button"
                        ></i>
                        <i
                            className="bi bi-caret-up text-secondary"
                            role="button"
                        ></i>
                        <span className="ms-2">3.5</span>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};

export default UserCard;
