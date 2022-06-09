import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../services/userService";
// import { toast } from "react-toastify";

const AuthContext = React.createContext();
const httpAuth = axios.create();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const signUp = async ({ email, password, ...rest }) => {
        const key = "AIzaSyDH5J236OxkC-LhOKwi4nD8yG1uKt6gL5A";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        const { data } = await httpAuth.post(url, {
            email,
            password,
            returnSecureKey: true,
        });
        console.log(data);
    };
    return (
        <AuthContext.Provider value={{ signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};
