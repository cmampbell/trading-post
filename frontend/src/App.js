import React, { useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router'
import Api from './Api'
import NavBar from './NavBar';


function App() {
  const [token, setToken] = useState();
  const [currUser, setCurrUser] = useState();
  const navigate = useNavigate();

  const register = async (regData) => {
    try {
      const resp = await Api.registerUser(regData);
      setToken(() => resp.token);
      setCurrUser(() => resp.user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const login = async (loginData) => {
    try {
      const resp = await Api.loginUser(loginData);
      setToken(() => resp.token);
      setCurrUser(()=> resp.user);
      navigate('/');
    } catch (err) {
      throw err;
    }
  }

  const logout = () =>{
    setToken(()=> null)
  }

  return (
    <div className="App">
      <NavBar token={token} logout={logout} />
      <Outlet context={{ register, token, login }} />
    </div>
  );
}

export default App;
