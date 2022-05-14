import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ name, value, onChange, type, label, error }) => {
  const [showPass, setShowPass] = useState(false);

  const getInputClasses = () => {
    return `form-control${error ? " is-invalid" : ""}`;
  };

  const getInputGroupClasses = () => {
    return `input-group${error ? " has-validation" : ""}`;
  };

  const toggleShowPass = () => {
    setShowPass(!showPass);
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
        <input
          type={showPass ? "text" : type}
          id={name}
          value={value}
          onChange={handleChange}
          name={name}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPass}
          >
            <i className={`bi bi-eye${showPass ? "-slash" : ""}`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
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
