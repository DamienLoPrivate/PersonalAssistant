//CONTEXT AND REDUCER TO KEEP LOCAL STATE INSYNC WITH DATABASE
import { createContext, useEffect, useState } from "react"

export const MainClockContext = createContext()

//Provide Context to the Rest of the Component Tree (So everything can acess it)
export const MainClockContextProvider = ({ children }) => {
    const [fullDateTime, setFullDateTime] = useState(new Date());
    const currentTime = fullDateTime.toLocaleTimeString()
    const currentDate = fullDateTime.toLocaleDateString()
    useEffect(() => {
        const interval = setInterval(() => {
            setFullDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <MainClockContext.Provider value={{ fullDateTime, currentTime, currentDate }}>
            {children}
        </MainClockContext.Provider>
    );
};