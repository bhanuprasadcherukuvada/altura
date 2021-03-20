import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {


  return (
    <div className="App">
      <ToastContainer/>
     <Main/>
    </div>
  );
}

export default App;
