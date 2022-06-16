import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens,
} from "../services/localStorageService";
// import userService from "../services/userService";
// import { toast } from "react-toastify";

const AuthContext = React.createContext();
export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!localStorageService.getAccessToken()) return setLoading(false);
        getUserData();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const signUp = async ({ email, password, ...rest }) => {
        const url = "accounts:signUp";

        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true,
            });
            setTokens(data);
            await createUser({
                ...rest,
                email,
                _id: data.localId,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "User with this email already exists",
                    };
                    throw errorObject;
                }
            }
        }
    };
    const signIn = async ({ email, password }) => {
        const url = "accounts:signInWithPassword";
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true,
            });
            setTokens(data);
            getUserData();
        } catch (error) {
            errorCatcher(error);

            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errObject = {
                        password: "Incorrect password. Try again",
                    };
                    throw errObject;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errObject = {
                        email: "No user with such email",
                    };
                    throw errObject;
                }
            }
        }
    };

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
            {!isLoading ? children : "Loading"}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};
