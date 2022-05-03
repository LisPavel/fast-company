import React from "react";
import PropTypes from "prop-types";

const TextField = ({ name, value, onChange, type, label, error }) => {
  return (
    <div>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      />
      <label htmlFor={name}>{label}</label>
      {error && <p>{error}</p>}
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default TextField;
