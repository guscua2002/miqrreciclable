import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./componentes/Home"
import Login from "./Login/Login"
import FormLogin from "./componentes/FormLogin";
import FormRegister from "./componentes/Form";

function App() {
  return (
    <div className="mainContainer">      
        <Routes>
          <Route path="/register" element={<FormRegister />} />
          <Route path="/" element={<FormLogin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
