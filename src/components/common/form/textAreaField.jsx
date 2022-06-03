import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ name, value, onChange, label, error, ...rest }) => {
    const getInputClasses = () => {
        return `form-control${error ? " is-invalid" : ""}`;
    };

    const getInputGroupClasses = () => {
        return `input-group${error ? " has-validation" : ""}`;
    };

    const handleChange = ({ target: { value, name } }) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4 ">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className={getInputGroupClasses()}>
                <textarea
                    {...rest}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default TextAreaField;
