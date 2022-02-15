import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Home/Home';
import AddEditTask from './Component/AddEditTask/AddEditTask';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addTask" element={<AddEditTask/>} />
        <Route path="/update/:id" element={<AddEditTask/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
