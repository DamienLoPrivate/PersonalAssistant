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
        <div className="TaskListItem">
            <div className='subheader'>
                <h4>{task.title}</h4>
                <button onClick={deleteTask}>Delete</button>
            </div>

            <p> Date Created: {format(new Date(task.createdAt), 'MM/dd/yyyy')}   , Due Date: { }</p>
        </div>
    )
}

export default TaskListItem