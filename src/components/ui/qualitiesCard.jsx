import React from "react";

const QualitiesCard = () => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <span className="badge bg-primary">Primary</span>
                    <span className="badge bg-secondary">Secondary</span>
                    <span className="badge bg-success">Success</span>
                    <span className="badge bg-danger">Danger</span>
                </p>
            </div>
        </div>
    );
};

export default QualitiesCard;
