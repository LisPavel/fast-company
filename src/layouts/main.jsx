import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { initialize, status, error, progress } = useMockData();
    const handleClick = () => {
        console.log("click");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Init data in fireBase</h3>
            <button className="btn btn-primary" onClick={handleClick}>
                INIT!
            </button>
            <ul>
                <li>Status : {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error</li>}
            </ul>
        </div>
    );
};

export default Main;
