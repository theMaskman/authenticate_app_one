import React, { useState, useEffect } from 'react';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  if(!localStorage.getItem("loginView") && !localStorage.getItem("id"))
    return <Register />
  else if(localStorage.getItem("loginView"))
    return <Login />

  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route  path="/" exact component={ Register } />
          <Route  path="/login" exact component={ Login } />
          <Route  path="/info" exact component={ Profile } />
        </Routes>
      </BrowserRouter> */}
      <Profile />
    </div> 
  )
}

export default App;