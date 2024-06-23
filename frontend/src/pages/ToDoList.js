import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToHome, goToToDo, goToNewTask } from './nav_methods'
import PageHeader from '../components/PageHeader'
import NavBar from '../components/NavBar';
import TaskListItem from '../components/TaskListItem';
import { useEffect, useState } from 'react';
import NewTaskHeader from '../components/NewTaskHeader';
import { useTasksContext } from '../Hooks/useTasksContext';


const ToDoListPage = () => {
    //FUNCTIONALITY TEST BUTTON
    const testFunc = () => {
        alert()
    }

    const navigate = useNavigate()
    //Local State Management
    const { tasks, dispatch } = useTasksContext()

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

            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskListItem key={task._id} task={task} />
                ))}
            </div>

        </div>
    );
};

export default ToDoListPage;
