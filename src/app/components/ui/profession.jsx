import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus,
} from "../../store/professions";

const Profession = ({ id }) => {
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    if (professionsLoading) return "Loading";
    const profession = useSelector(getProfessionById(id));

    return <span>{profession.name}</span>;
};

Profession.propTypes = {
    id: PropTypes.string,
};

export default Profession;
