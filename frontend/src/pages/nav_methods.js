import { useNavigate } from 'react-router-dom';

const goToToDo = (navigate) => {
    navigate('/ToDoList');
};

const goToHome = (navigate) => {
    navigate('/')
}

const goToSettings = (navigate) => {
    navigate('/settings')
}



export {
    goToToDo,
    goToHome,
    goToSettings
}