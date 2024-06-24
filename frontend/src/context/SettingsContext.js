//CONTEXT AND REDUCER TO KEEP LOCAL STATE INSYNC WITH DATABASE

import { createContext, useEffect, useReducer } from "react"

export const SettingsContext = createContext()

/** settingsReducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
export const settingsReducer = (state, action) => {
    switch (action.type) {
        //CASE: SET_SETTINGs action is previous state of SETTINGS
        case 'SET_SETTINGS':
            console.log("Set Settings Called")
            console.log(action.payload)
            return {
                settings: action.payload
            }

        //CASE: DEFAULT, return previous state
        default:
            return state
    }
}

//Provide Context to the Rest of the Component Tree (So everything can acess it)

export const SettingsContextProvider = ({ children }) => {

    //SettingsContextProvider state definition
    const [state, dispatch] = useReducer(settingsReducer, {
        settings: { username: 'TEMP', workingHours: 0 }
    })

    //Update Local State as soon as the SettingsContextProvider is loaded
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_SETTINGS', payload: json[0] });
                } else {
                    console.error('Failed to fetch settings:', json.error);
                }
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            }
        };

        fetchSettings();
    }, []);


    return (
        <SettingsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SettingsContext.Provider>
    )
}