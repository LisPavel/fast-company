import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";

// import professionService from "../services/professionService";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    useEffect(() => setComments([]), []);

    // function errorCatcher(error) {
    //     console.log(error);
    //     const { message } = error.response.data;
    //     setError(message);
    // }

    return (
        <CommentsContext.Provider value={{ comments }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};
