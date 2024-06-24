import format from 'date-fns/format'
import { useTasksContext } from '../Hooks/useTasksContext'

const TaskListItem = ({ task }) => {

    const { dispatch } = useTasksContext()

    const testFunc = () => {
        alert(task.completedStatus)
    }

    /** deleteTask
     * Deletes the task given by the button
     */
    const deleteTask = async () => {
        //Call DELETE request
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json });
        }

    }
    /** updateTask
     * Updates all input parameters
     */
    const updateTask = async (title, dueDate, datesRequired, hoursRequired, description, completedStatus) => {
        const updatedTask = {
            title: title,
            dueDate: dueDate,
            datesRequired: datesRequired,
            hoursRequired: hoursRequired,
            description: description,
            completedStatus: completedStatus
        }

        //Call PATCH Request
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedTask),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        //Update Local State
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'UPDATE_TASK', payload: json })
        }
    }

    /** flipComplete
     * Flips the completed State of a task object
     */
    const flipComplete = async () => {
        updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, !task.completedStatus)
    }

    return (
        <div className="TaskListItem">
            <button className='completedButton' onClick={flipComplete}></button>
            <button className='startStopButton' onClick={testFunc}></button>

            <button className='TaskListText' onClick={testFunc}>
                <p className='TaskTitle'>{task.title}</p>
                <p> Date Created: {format(new Date(task.createdAt), 'dd/MM/yyyy')},
                    Due Date: {format(new Date(task.dueDate), 'dd/MM/yyyy')},
                    Hours Requierd: {task.hoursRequired}

                </p>
                <p>Dates required: {task.datesRequired} Completed: {String(task.completedStatus)} </p>
            </button>


            <button className="deletetaskbutton" onClick={deleteTask}></button>
        </div>


    )
}

export default TaskListItem