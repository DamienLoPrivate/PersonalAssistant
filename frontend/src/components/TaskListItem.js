import format from 'date-fns/format'
import { useTasksContext } from '../Hooks/useTasksContext'

const TaskListItem = ({ task }) => {

    const { dispatch } = useTasksContext()

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
        <button className="TaskListItem" onClick={deleteTask}>
            <button className='completedButton'></button>
            <button className='startStopButton'></button>

            <div className='TaskListText'>
                <p>{task.title}</p>
                <p> Date Created: {format(new Date(task.createdAt), 'dd/MM/yyyy')}   , Due Date: {format(new Date(task.dueDate), 'dd/MM/yyyy')}</p>
                <p>Dates required: {task.datesRequired}</p>
            </div>


            <button className="deletetaskbutton" onClick={deleteTask}>Delete</button>
        </button>


    )
}

export default TaskListItem