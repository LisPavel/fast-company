import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/userService";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUsers = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => getUsers(), []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (isLoading) return;
        const newUsers = [...users];
        const userIndex = newUsers.findIndex((u) => u._id === currentUser._id);
        newUsers[userIndex] = currentUser;
        setUsers(newUsers);
    }, [currentUser, isLoading]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        } finally {
            // setIsLoading(false);
        }
    }

    const getUserById = (userId) => {
        return users.find((u) => u._id === userId);
    };

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
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
