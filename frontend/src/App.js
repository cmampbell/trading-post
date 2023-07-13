import './App.css';
import { Outlet, useNavigate } from 'react-router'
import Api from './Api'
import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const register = async (regData) => {
    try {
      const token = await Api.registerUser(regData);
      console.log(token);
      setToken(() => token);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const login = async (loginData) => {
    try {
      const token = await Api.loginUser(loginData);
      setToken(() => token);
      navigate('/');
    } catch (err) {
      throw err;
    }
  }
  return (
    <div className="App">
      <Outlet context={{ register, token, login }} />
    </div>
  );
}

export default App;
