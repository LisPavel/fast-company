import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange(target.value);
    };
    return (
        <div className="input-group w-100">
            <input
                className="form-control"
                type="text"
                placeholder="Search"
                onChange={handleChange}
                value={value}
            />
            <i className="bi bi-search input-group-text"></i>
        </div>
    );
};

SearchField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default SearchField;
