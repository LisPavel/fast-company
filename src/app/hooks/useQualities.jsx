import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import qualityService from "../services/qualityService";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => getQualities(), []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getQualities() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
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

    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    return (
        <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};
