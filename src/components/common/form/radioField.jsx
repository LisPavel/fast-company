import React from "react";
import PropTypes from "prop-types";

const RadioField = ({
  value,
  name,
  label,
  options,
  onChange,
  error,
  isInline,
}) => {
  const handleChange = ({ target: { value, name } }) => {
    onChange({ name, value });
  };

  const renderOptions = () => {
    return options.map((option) => (
      <div
        className={`form-check${isInline ? " form-check-inline" : ""}`}
        key={option.value}
      >
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id={`${option.name}_${option.value}`}
          checked={option.value === value}
          value={option.value}
          onChange={handleChange}
        />
        <label
          className="form-check-label"
          htmlFor={`${option.name}_${option.value}`}
        >
          {option.name}
        </label>
      </div>
    ));
  };

  return (
    <div className="mb-4">
      {label && <label className="form-label me-3">{label}</label>}
      <div>{renderOptions()}</div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

RadioField.defaultProps = {
  options: [],
  isInline: true,
};

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })
  ),
  isInline: PropTypes.bool,
};

export default RadioField;
