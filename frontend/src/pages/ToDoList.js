import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHome, goToToDo, goToNewTask } from './nav_methods'
import PageHeader from '../components/PageHeader'
import NavBar from '../components/generalComponents/NavBar';
import TaskListItem from '../components/TaskListItem';
import { useEffect, useState } from 'react';
import NewTaskHeader from '../components/NewTaskHeader';
import { useTasksContext } from '../Hooks/useTasksContext';
import { useSettingsContext } from '../Hooks/useSettingsContext';
import UncompletedTaskList from '../components/UncompletedTaskList';
import CompletedTaskList from '../components/CompletedTaskList';
import { useMainClockContext } from '../Hooks/useMainClockContext';


const ToDoListPage = () => {
    //FUNCTIONALITY TEST BUTTON
    const testFunc = () => {
        alert(username + workingHours)
    }

    const navigate = useNavigate()
    const { fullDateTime, currentTime, currentDate } = useMainClockContext()    //Main Clock Components

    //Local State Management
    const { tasks, dispatch } = useTasksContext()
    const { settings } = useSettingsContext()
    const { username, workingHours } = settings

    /** useEffect
     * Hook to fetch tasks when the Task List is rendered
     */
    useEffect(() => {
        const fetchTasks = async () => {
            //Fetch task list "tasks" from db server
            const response = await fetch('/api/tasks')
            const tasks = await response.json()

            //Check if response is ok
            if (response.ok) {
                //If ok, update global context state reducer
                dispatch({ type: 'SET_TASKS', payload: tasks })
            } else {
                console.log("Not Ok")
            }
        }

        fetchTasks()

    }, [])



    return (
        <div className="ToDoListPage">

            <NavBar goFunc={goToHome} navigate={navigate} />

            <header>
                <div className="PageHeader">
                    <h1>To Do List</h1>
                    <button className='functionalityTestButton' onClick={testFunc}>FUNTIONALITY TEST BUTTON ToDoListPage</button>
                </div>
            </header>

            <NewTaskHeader />

            <div className='PageHeader'>
                <h1>Uncompleted Tasks</h1>
            </div>

            <UncompletedTaskList tasks={tasks} />

            <div className='PageHeader'>
                <h1>Completed Tasks</h1>
            </div>

            <CompletedTaskList tasks={tasks} />


        </div>
    );
};

export default ToDoListPage;
