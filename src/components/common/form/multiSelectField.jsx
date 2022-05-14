import React from "react";
import ReactSelect from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  value,
  onChange,
  name,
  options: _options,
  defaultValue,
  label,
}) => {
  const options =
    !Array.isArray(_options) && typeof _options === "object"
      ? Object.values(_options)
      : _options;

  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <ReactSelect
        isMulti
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        name={name}
        options={options}
        value={value}
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
      />
    </div>
  );
};

MultiSelectField.defaultProps = {
  options: [],
};

MultiSelectField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.array,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
};

export default MultiSelectField;
