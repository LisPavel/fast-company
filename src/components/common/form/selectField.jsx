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
  const options = Object.keys(_options).map((optKey) => ({
    name: _options[optKey].name,
    value: _options[optKey].value ?? _options[optKey]._id,
  }));

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
        id="validationCustom04"
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
              {option.name}
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
