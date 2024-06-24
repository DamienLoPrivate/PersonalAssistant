//CONTEXT AND REDUCER TO KEEP LOCAL STATE INSYNC WITH DATABASE

import { createContext, useReducer } from "react"

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
        settings: null
    })


    return (
        <SettingsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SettingsContext.Provider>
    )
}