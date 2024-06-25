import format from 'date-fns/format'
import { useTasksContext } from '../Hooks/useTasksContext'
import { useMainClockContext } from '../Hooks/useMainClockContext';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, parse, addDays } from 'date-fns';
import { useRef, useState } from 'react';
import ClickHoldButton from './generalComponents/ClickHoldButton';


const TaskListItem = ({ task }) => {

    const { dispatch } = useTasksContext()
    let { fullDateTime, currentTime, currentDate, stopWatchTime, startStopwatch, stopStopwatch, resetStopwatch, stopWatchRunning } = useMainClockContext()  //Main Clock Components

    const holdFunc = () => {
        alert("Button Held")
    }

    const clickFunc = () => {
        alert("Button Clicked")
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

    /** runStopWatch
     * Runs the tasks's stopwatch to count duration of use
     */
    const stopStartStopWatch = async () => {
        if (!stopWatchRunning) {
            console.log('Stop watch started, no time added yet')
            resetStopwatch()
            startStopwatch()

        } else {
            stopStopwatch()
            task.timeElapsed += stopWatchTime
            updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, task.completedStatus, task.timeElapsed)
            console.log('Stop watch stopped, time added')
        }
    }
    const resetTimeElapsed = async () => {
        updateTask(task.title, task.dueDate, task.datesRequired, task.hoursRequired, task.description, task.completedStatus, 0)
    }

    return (
        <div className="TaskListItem">
            <button className='completedButton' onClick={flipComplete}></button>
            <ClickHoldButton clickFunc={stopStartStopWatch} holdFunc={resetTimeElapsed} holdDuration={1000} className={'startStopButton'}></ClickHoldButton>

            <button className='TaskListText' onClick={clickFunc}>
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
                    Time Elapsed: {Math.ceil(task.timeElapsed)} minutes
                </p>
            </button>


            <button className="deletetaskbutton" onClick={deleteTask}></button>
        </div>


    )
}

export default TaskListItem