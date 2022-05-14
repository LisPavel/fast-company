import React from "react";
import ReactSelect from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  value,
  onChange,
  name,
  options: _options,
  label,
}) => {
  const options = Object.keys(_options).map((optKey) => ({
    label: _options[optKey].name,
    value: _options[optKey].value ?? _options[optKey]._id,
  }));

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
};

export default MultiSelectField;
