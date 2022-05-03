import React, { useEffect, useState } from "react";
import TextField from "../components/textField";

const LogIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    // setEmail(ev.target.value);
  };

  const validate = () => {
    const errors = {};
    for (const fieldName of Object.keys(data)) {
      if (data[fieldName].trim() === "") {
        errors[fieldName] = `${fieldName} is required`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => validate(), [data]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
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
      <button>Submit</button>
    </form>
  );
};

export default LogIn;
