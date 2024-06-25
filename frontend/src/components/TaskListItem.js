import format from 'date-fns/format'
import { useTasksContext } from '../Hooks/useTasksContext'
import { useMainClockContext } from '../Hooks/useMainClockContext';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parse, addDays } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import ClickHoldButton from './generalComponents/ClickHoldButton';


const TaskListItem = ({ task }) => {

    const { dispatch } = useTasksContext()
    let { fullDateTime, currentTime, currentDate, stopWatchTime, startStopwatch, stopStopwatch, resetStopwatch, stopWatchRunning } = useMainClockContext()  //Main Clock Components
    let [displayTimeElapsed, setDisplayTimeElaspsed] = useState(Math.ceil(task.timeElapsed / 60))
    const intervalRef = useRef(null);
    const [startTime, setStartTime] = useState(new Date())
    const [counting, setCounting] = useState(false)
    const startStopButtonRef = useRef(null);

    const testFunc = () => {
        alert("Changed")
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
    const updateTask = async (title, dueDate, datesRequired, hoursRequired, description, completedStatus, timeElapsed) => {
        const updatedTask = {
            title: title,
            dueDate: dueDate,
            datesRequired: datesRequired,
            hoursRequired: hoursRequired,
            description: description,
            completedStatus: completedStatus,
            timeElapsed: timeElapsed
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
        updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, !task.completedStatus, task.timeElapsed)
    }

    /** datesRemain
     * 
     */
    const datesRemain = () => {
        return differenceInDays(new Date(task.dueDate), currentDate)
    }

    const startStopTaskStopWatch = async () => {
        //If Start Counting
        if (!counting) {
            //Reset / Set start time to current time of begining time count
            setStartTime(new Date())
            console.log("Starting count at start time: ", startTime)
            //Update Display every minute
            intervalRef.current = setInterval(() => {
                setDisplayTimeElaspsed(displayTimeElapsed += 1); // Increment by 1 every 60000 miliseconds
            }, 60000);
            setCounting(true)

        } else {
            //Take the difference in start and end time, add to original time elapsed
            console.log("Calculating Difference in Time between: ", new Date(), " and ", startTime)
            const newTimeElasped = differenceInSeconds(new Date(), startTime) + task.timeElapsed
            updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, task.completedStatus, newTimeElasped)

            //Stop Display
            clearInterval(intervalRef.current);

            //Match the Display to the task.timeElapses in Minutes
            setDisplayTimeElaspsed(Math.ceil(newTimeElasped / 60))
            setCounting(false)
        }

    }


    /** resetTimeElapsed
     * Resets both the task.timeElapsed value and displayTimeElapsed Value to 0
     */
    const resetTimeElapsed = async () => {
        updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, task.completedStatus, 0)
        setDisplayTimeElaspsed(0)
    }

    // Update localTimeElapsed every minute
    useEffect(() => {
        return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        if (counting) {
            startStopButtonRef.current.className = "startStopButtonPause"

        } else {
            startStopButtonRef.current.className = "startStopButtonPlay"
        }
    }, [counting]);

    return (
        <div className="TaskListItem">
            <button className='completedButton' onClick={flipComplete}></button>
            <ClickHoldButton ref={startStopButtonRef} clickFunc={startStopTaskStopWatch} holdFunc={resetTimeElapsed} holdDuration={500} className={'startStopButton'}></ClickHoldButton>

            <button className='TaskListText' onClick={testFunc}>
                <p className='TaskTitle'>{task.title}</p>
                <p> Date Created: {format(new Date(task.createdAt), 'dd/MM/yyyy')},
                    Due Date: {format(new Date(task.dueDate), 'dd/MM/yyyy')},
                    Hours Requierd: {task.hoursRequired}

                </p>
                <p>Dates required: {task.datesRequired},
                    Completed: {String(task.completedStatus)},
                    Dates Remaining: {datesRemain()}
                </p>
                <p>
                    Time Elapsed: {Math.ceil(displayTimeElapsed)} minutes
                </p>
            </button>


            <button className="deletetaskbutton" onClick={deleteTask}></button>
        </div>


    )
}

export default TaskListItem