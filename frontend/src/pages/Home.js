import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToToDo } from './nav_methods'

const Home = () => {

    const navigate = useNavigate()


    return (
        <div className="home">
            <h2>Home</h2>

            <div>
                <button onClick={() => goToToDo(navigate)}>ToDoPage</button>
            </div>


        </div>




    )
}

export default Home