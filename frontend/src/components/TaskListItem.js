import format from 'date-fns/format'
import { useTasksContext } from '../Hooks/useTasksContext'

const TaskListItem = ({ task }) => {

    const { dispatch } = useTasksContext()

    const testFunc = () => {
        alert(task.title)
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

    return (
        <div className="TaskListItem">
            <button className='completedButton'></button>
            <button className='startStopButton' onClick={testFunc}></button>

            <button className='TaskListText' onClick={testFunc}>
                <p className='TaskTitle'>{task.title}</p>
                <p> Date Created: {format(new Date(task.createdAt), 'dd/MM/yyyy')},
                    Due Date: {format(new Date(task.dueDate), 'dd/MM/yyyy')},
                    Hours Requierd: {task.hoursRequired}

                </p>
                <p>Dates required: {task.datesRequired}</p>
            </button>


            <button className="deletetaskbutton" onClick={deleteTask}></button>
        </div>


    )
}

export default TaskListItem