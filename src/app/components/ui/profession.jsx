import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { getProfession, isLoading } = useProfessions();
    const profession = getProfession(id);

    if (isLoading) return "loading...";
    return <span>{profession.name}</span>;
};

Profession.propTypes = {
    id: PropTypes.string,
};

export default Profession;
