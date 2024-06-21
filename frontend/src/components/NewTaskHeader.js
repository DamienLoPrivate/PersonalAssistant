import { format, addDays, setHours } from 'date-fns'
import { useState } from 'react'
import { useTasksContext } from '../Hooks/useTasksContext'


const NewTaskHeader = () => {
    //TEST FUNCTION
    const testFunc = () => {
    }

    const { dispatch } = useTasksContext()
    const [title, setTitle] = useState('')
    const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [datesRequired, setDatesRequired] = useState(0)
    const [hoursRequired, setHoursRequired] = useState(0)
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = { title, dueDate, datesRequired, hoursRequired, description }

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
            dispatch({ type: 'CREATE_TASK', payload: json })
            setTitle('')
            setDueDate(new Date())
            setDatesRequired(0)
            setHoursRequired(0)
            setDescription('')


        }
    }

    //TEMPLATE CALCULATION FUNCTIONS:
    /** handleDueDateChange
     * Updates due dates and dates required, due date cannot be before today
     * @param {*} e 
     */
    const handleDueDateChange = (e) => {
        const newDueDate = e;
        const startDate = new Date();
        const endDate = new Date(newDueDate);
        var diffTime = endDate - startDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            alert("Due date cannot be in the past");
            diffTime = 0
        } else {
            setDueDate(newDueDate);
            setDatesRequired(diffDays);
        }
    }

    /** handleDateRequiredChange
     * Updates the dateRequired and projected due date
     * @param {*} e Element of input field
     */
    const handleDatesRequiredChange = (e) => {
        const days = parseInt(e, 10);
        setDatesRequired(days);
        const newDueDate = addDays(new Date(), days);
        setDueDate(format(newDueDate, 'yyyy-MM-dd'));
    }



    //TEMPLATE RETURN
    return (
        <form className='create' onSubmit={handleSubmit}>


            <button onClick={() => testFunc()}>FUNCTIONAL TEST BUTTON</button>


            <div className='subheader'>
                <button className='addButton'>Add</button>
                <input className='newTaskLabel'
                    placeholder='New Task Title'
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div className='newTaskDetails'>

                <div className='newDueDate'>
                    <label>Due Date: </label>
                    <input className=''
                        type='date'
                        onChange={(e) => handleDueDateChange(e.target.value)}
                        value={dueDate}
                    />
                </div>

                <div className='newDatesRequired'>
                    <label>Days Required: </label>
                    <input className=''
                        type='number'
                        onChange={(e) => handleDatesRequiredChange(e.target.value)}
                        value={datesRequired}
                    />
                </div>

                <div className='newHoursREquired'>
                    <label>Hours Required: </label>
                    <input className=''
                        type='number'
                        onChange={(e) => setHoursRequired(e.target.value)}
                        value={hoursRequired}
                    />
                </div>
            </div>

            <div className='newDescription'>
                <label className='newDescriptionLabel'>Description:</label>
                <input className='newDescriptionInput'
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>



        </form>
    )
}

export default NewTaskHeader