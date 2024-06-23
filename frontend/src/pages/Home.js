import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToToDo, goToSettings } from './nav_methods'

const Home = () => {

    const navigate = useNavigate()


    return (
        <div className="home">
            <h2>Home</h2>

            <div>
                <button onClick={() => goToToDo(navigate)}>ToDoPage</button>
            </div>

            <div>
                <button onClick={() => goToSettings(navigate)}>Settings</button>
            </div>

        </div>




    )
}

export default Home