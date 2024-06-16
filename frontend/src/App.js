import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES AND COMPONENTS
import Home from './pages/Home'
import ToDoListPage from "./pages/ToDoList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="Pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ToDoList" element={<ToDoListPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
