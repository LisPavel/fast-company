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
  const options = Object.keys(_options).map((optionName) => ({
    name: _options[optionName].name,
    value: _options[optionName]._id,
  }));

  const getInputClasses = () => {
    return `form-select${error ? " is-invalid" : ""}`;
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        onChange={onChange}
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
