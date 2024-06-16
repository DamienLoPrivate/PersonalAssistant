import { useNavigate } from 'react-router-dom';

const goToToDo = (navigate) => {
    navigate('/ToDoList');
};

const goToHome = (navigate) => {
    navigate('/')
}



export {
    goToToDo,
    goToHome,
}