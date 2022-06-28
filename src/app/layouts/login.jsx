import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const LogIn = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleForm = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    const renderForm = () => {
        return formType === "register" ? (
            <>
                <h3 className="mb-4">Register</h3>
                <RegisterForm />
                <p>
                    Already have an account?{" "}
                    <a role="button" onClick={toggleForm}>
                        Sign in
                    </a>
                </p>
            </>
        ) : (
            <>
                <h3 className="mb-4">Login</h3>
                <LoginForm />
                <p>
                    {"Don't"} have an account?{" "}
                    <a role="button" onClick={toggleForm}>
                        Sign up
                    </a>
                </p>
            </>
        );
    };
    return (
        <div className="container mt-5 shadow">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">{renderForm()}</div>
            </div>
        </div>
    );
};

export default LogIn;
