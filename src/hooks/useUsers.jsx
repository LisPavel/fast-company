import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/userService";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUsers = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => getUsers(), []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={{ users }}>
            {!isLoading ? children : <h1>Users Loading...</h1>}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

export default UserProvider;
