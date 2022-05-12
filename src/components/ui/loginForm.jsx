import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator.js";
import TextField from "../common/form/textField";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    // setEmail(ev.target.value);
  };

  const validatorCfg = {
    email: {
      isRequired: { message: "Email is required" },
      isEmail: { message: "Not correct email" },
    },
    password: {
      isRequired: { message: "Password is required" },
      isCapitalSymbol: {
        message: "Password required at list 1 capital symbol",
      },
      isContainDigit: {
        message: "Password required at list 1 digit",
      },
      min: {
        value: 8,
        message: "Password required minimum 8 symbols",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorCfg);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => validate(), [data]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container mt-5 shadow">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
