import { useNavigate } from "react-router-dom";
import NavBar from "../components/generalComponents/NavBar";
import { goToHome, goToToDo, goToSettings } from './nav_methods'
import { useEffect, useState } from "react";
import { useSettingsContext } from "../Hooks/useSettingsContext";
import { useMainClockContext } from "../Hooks/useMainClockContext";


const SettingsPage = () => {
    const testFunc = () => {
        alert(username + workingHours)
    }

    const navigate = useNavigate()
    const { fullDateTime, currentTime, currentDate } = useMainClockContext()    //Main Clock Components

    const { dispatch } = useSettingsContext()
    const [username, setUsername] = useState('DEFAULT')
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

    //INPUT CHECKS
    const setCheckedWorkingHours = (e) => {
        if (e <= 24) { setWorkingHours(e) }
        else { alert("Please select a number under 24") }
    }



    return (
        <div className="SettingsPage">

            <NavBar goFunc={goToHome} navigate={navigate} />

            <h1>SETTINGS</h1>
            <div className="MainClock">
                <h2>Main Clock:  </h2> <h2>{String(fullDateTime)}</h2>
            </div>

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
                    <label>Work Hours Avaliable: </label>
                    <input className=''
                        type='number'
                        onChange={(e) => (setCheckedWorkingHours(Number(e.target.value)))}
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
