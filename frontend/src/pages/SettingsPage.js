import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { goToHome, goToToDo, goToSettings } from './nav_methods'
import { useState } from "react";


const SettingsPage = () => {
    const testFunc = () => {
        alert(HOURSAVALIABLE)
    }


    const navigate = useNavigate()

    const [HOURSAVALIABLE, setHOURSAVALIABLE] = useState(0)



    return (
        <div className="SettingsPage">

            <NavBar goFunc={goToHome} navigate={navigate} />

            <h1>SETTINGS</h1>

            <div className='setHOURSAVALIABLE'>
                <label>Hours Avaliable: </label>
                <input className=''
                    type='number'
                    onChange={(e) => (setHOURSAVALIABLE(e.target.value))}
                    value={HOURSAVALIABLE}
                />
            </div>

            <button onClick={testFunc}>TEST</button>


        </div>
    );
};

export default SettingsPage;
