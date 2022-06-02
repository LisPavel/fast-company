import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualities/qualitie";

const QualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    {qualities.map((qualitie, index) => (
                        <Qualitie {...qualitie} key={qualitie._id ?? index} />
                    ))}
                </p>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QualitiesCard;
