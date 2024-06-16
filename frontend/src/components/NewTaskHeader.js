import format from 'date-fns/format'
import { useState } from 'react'
import { useTasksContext } from '../Hooks/useTasksContext'


const NewTaskHeader = () => {
    const { dispatch } = useTasksContext()
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = { title }

        //POST new tasks
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //Check Response of POST
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            console.log('New Task Added', json)
            setTitle('')
            dispatch({ type: 'CREATE_TASK', payload: json });
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <div className='subheader'>
                <h3>Add a New Task</h3>
                <button>Add</button>
            </div>


            <label>Task Title: </label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
        </form>
    )
}

export default NewTaskHeader