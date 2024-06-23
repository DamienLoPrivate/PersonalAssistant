import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { goToHome, goToToDo, goToSettings } from './nav_methods'
import { useEffect, useState } from "react";
import { useSettingsContext } from "../Hooks/useSettingsContext";


const SettingsPage = () => {
    const testFunc = () => {
        alert(workingHours + 1)
    }

    const navigate = useNavigate()

    const { dispatch } = useSettingsContext()
    const [username, setUsername] = useState('TEMP')
    const [workingHours, setWorkingHours] = useState(0)
    const [error, setError] = useState(null)

    //Fetch Current Settings when component is rendered
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const json = await response.json();

                if (response.ok) {
                    setUsername(json[0].username);
                    setWorkingHours(json[0].workingHours);

                } else {
                    setError(json.error);
                }
            } catch (err) {
                setError('Failed to fetch settings');
            }
        };

        fetchSettings();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const setting = { username, workingHours }

        const response = await fetch('/api/settings', {
            method: 'PATCH',
            body: JSON.stringify(setting),
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
            dispatch({ type: 'SET_SETTINGS', payload: json })
            console.log('Settings Updated', json)

        }
    }



    return (
        <div className="SettingsPage">

            <NavBar goFunc={goToHome} navigate={navigate} />

            <h1>SETTINGS</h1>

            <button onClick={() => testFunc()}>FUNCTIONAL TEST BUTTON</button>


            <form className='create' onSubmit={handleSubmit}>
                <div className='setUsername'>
                    <label>Username: </label>
                    <input className=''
                        type='text'
                        onChange={(e) => (setUsername(e.target.value))}
                        value={username}
                    />
                </div>


                <div className='setWorkingHours'>
                    <label>Hours Avaliable: </label>
                    <input className=''
                        type='number'
                        onChange={(e) => (setWorkingHours(Number(e.target.value)))}
                        value={workingHours}
                    />
                </div>


                <button>Submit</button>
            </form>







            <button onClick={testFunc}>TEST</button>


        </div>
    );
};

export default SettingsPage;
