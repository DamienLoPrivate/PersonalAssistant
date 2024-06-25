//CONTEXT AND REDUCER TO KEEP LOCAL STATE INSYNC WITH DATABASE
import { createContext, useEffect, useRef, useState } from "react"

export const MainClockContext = createContext()

//Provide Context to the Rest of the Component Tree (So everything can acess it)
export const MainClockContextProvider = ({ children }) => {
    //Univeral Clock 
    const [fullDateTime, setFullDateTime] = useState(new Date());
    const currentDate = new Date(fullDateTime.toDateString());
    const currentTime = new Date(fullDateTime.getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setFullDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    //Universal Stopwatch 
    const [stopWatchTime, setStopWatchTime] = useState(0)
    const [stopWatchRunning, setStopWatchRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (stopWatchRunning) {
            intervalRef.current = setInterval(() => {
                setStopWatchTime(prevTime => prevTime + 10); // Update time every 10ms
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current); // Clean up on unmount
    }, [stopWatchRunning]);

    const startStopwatch = () => setStopWatchRunning(true);
    const stopStopwatch = () => setStopWatchRunning(false);
    const resetStopwatch = () => {
        setStopWatchRunning(false);
        setStopWatchTime(0);
    };

    const formatTime = (time) => {
        const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor((time / 3600000))}`.slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };


    return (
        <MainClockContext.Provider value={{ fullDateTime, currentTime, currentDate, stopWatchTime, startStopwatch, stopStopwatch, resetStopwatch, stopWatchRunning }}>
            {children}
        </MainClockContext.Provider>
    );
};