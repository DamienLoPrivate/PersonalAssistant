//CONTEXT AND REDUCER TO KEEP LOCAL STATE INSYNC WITH DATABASE

import { createContext, useReducer } from "react"

export const TasksContext = createContext()

/** taskReducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
export const tasksReducer = (state, action) => {
    switch (action.type) {
        //CASE: SET_TASKS action is previous state of tasks
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        //CASE: CREATE_TASK, add new tasks from action.payload to rest of current state
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        //CASE: DELETE_TASK, deletes a task from the currentstate
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }

        //CASE: DEFAULT, return previous state
        default:
            return state
    }
}

//Provide Context to the Rest of the Component Tree (So everything can acess it)

export const TasksContextProvider = ({ children }) => {

    //TasksContextProvider state definition
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })


    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    )
}