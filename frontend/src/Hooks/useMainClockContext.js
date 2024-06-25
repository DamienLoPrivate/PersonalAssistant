import { MainClockContext } from "../context/MainClockContext";
import { useContext } from "react";

export const useMainClockContext = () => {
    const context = useContext(MainClockContext)

    if (!context) {
        throw Error('useMainClockContext must be used inside an useMainClockContextProvider')
    }

    return context
}