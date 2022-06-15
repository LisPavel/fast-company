import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../services/httpService";

const useMockData = () => {
    const statusConst = {
        idle: "Not started",
        pending: "In process",
        successed: "Ready",
        error: "Error occurred",
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    const summaryCount = professions.length + qualities.length + users.length;

    const incCount = () => setCount((ps) => ps + 1);
    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) setProgress(() => newProgress);
        if (newProgress === 100) setStatus(statusConst.successed);
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put(`profession/${prof._id}`, prof);
                incCount();
            }
            for (const user of users) {
                await httpService.put(`user/${user._id}`, user);
                incCount();
            }
            for (const q of qualities) {
                await httpService.put(`quality/${q._id}`, q);
                incCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
