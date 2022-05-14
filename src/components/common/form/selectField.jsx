/* eslint-disable indent */
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  options: _options,
  defaultValue,
  error,
  onChange,
}) => {
  const options =
    !Array.isArray(_options) && typeof _options === "object"
      ? Object.values(_options)
      : _options;

  const getInputClasses = () => {
    return `form-select${error ? " is-invalid" : ""}`;
  };

  const handleChange = ({ target: { value, name } }) => {
    onChange({ name, value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        value={value}
        onChange={handleChange}
        name={name}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {options &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.defaultProps = {
  options: [],
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SelectField;
