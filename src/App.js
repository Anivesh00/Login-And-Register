// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ImageUpload from "./ImageUpload"
import Employeeupload from "./EmployeeDetails"
import Employeedata from "./EmployeeData"
import { ToastContainer } from "react-toastify";

function HelloWorld() {
  return <h1>Hello World!</h1>;
}

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/imageupload' element={<ImageUpload />} />
          <Route path='/employeeupload' element={<Employeeupload />} />
          <Route path='/employeedata' element={<Employeedata />} />
          <Route path='/hello' element={<HelloWorld />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
