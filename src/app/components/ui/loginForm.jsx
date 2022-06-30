import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logIn } from "../../store/users.js";
// import { useAuth } from "../../hooks/useAuth.jsx";
import { validator } from "../../utils/validator.js";
import CheckBoxField from "../common/form/checkBoxField.jsx";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false,
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const dispatch = useDispatch();

    // const { signIn } = useAuth();

    const handleChange = (data) => {
        if (!data) return;
        setData((prevState) => ({
            ...prevState,
            [data.name]: data.value,
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
        const redirect = history.location.state?.from?.pathname
            ? history.location.state.from.pathname
            : "/";

        dispatch(logIn({ redirect, payload: data }));

        // try {
        //     await signIn(data);
        // history.push(
        // );
        // } catch (error) {
        //     setErrors(error);
        // }
    };

    return (
        <>
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
                <CheckBoxField
                    name="stayOn"
                    onChange={handleChange}
                    value={data.stayOn}
                >
                    Stay on
                </CheckBoxField>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default LoginForm;
