import React from "react";
import { useMainClockContext } from "../../Hooks/useMainClockContext";

const MainClock = () => {
    const dateTime = useMainClockContext();

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="MainClock">
            <h2>{formatDate(dateTime)} {formatTime(dateTime)}</h2>
        </div>
    );
};

export default MainClock;
