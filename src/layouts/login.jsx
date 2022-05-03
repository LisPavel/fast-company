import React, { useState } from "react";

const LogIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    // setEmail(ev.target.value);
  };
  return (
    <form action="">
      <div>
        <input
          type="text"
          id="email"
          value={data.email}
          onChange={handleChange}
          name="email"
        />
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
      </div>
    </form>
  );
};

export default LogIn;
