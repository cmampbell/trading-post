import React, { useState } from 'react';
import './App.css';
import { Outlet, useLoaderData, useNavigate } from 'react-router'
import UserService from './Api/UserService'
import NavBar from './_common/NavBar';
import CssBaseline from '@mui/material/CssBaseline';

/* Parent component to all routes.
*
*  We useLoaderData to get a users token and currUser object from local storage.
*  This allows us to grab the data before App is rendered, so if the data
*  exists in localStorage, we have it ready on first render of App.
*
*  If there is no token or currUser object in localStorage, we set state to null
*
*  We pass down register, login, currUser, token as Outlet Context, allowing
*  child components to access this data with the useOutletContext() hook. 
*
*/
function App() {
  const [localStorageToken, localStorageCurrUser] = useLoaderData();
  const [token, setToken] = useState(localStorageToken || null);
  const [currUser, setCurrUser] = useState(localStorageCurrUser || null);
  const navigate = useNavigate();

  const setStateAndStorage = (resp) => {
    setToken(() => resp.token);
    setCurrUser(()=> resp.user);
    localStorage.setItem("token", resp.token);
    localStorage.setItem("currUser", JSON.stringify(resp.user));
  }

  const register = async (regData) => {
    try {
      const resp = await UserService.registerUser(regData);
      setStateAndStorage(resp);
      navigate('/')
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const login = async (loginData) => {
    try {
      const resp = await UserService.loginUser(loginData);
      setStateAndStorage(resp);
      navigate('/');
    } catch (err) {
      throw err;
    }
  }

  const logout = () =>{
    setToken(()=> null);
    setCurrUser(()=> null);
    localStorage.removeItem("token")
    localStorage.removeItem("currUser")
    navigate('/');
  }

  return (
    <div className="App">
      <CssBaseline />
      <NavBar token={token} logout={logout} currUser={currUser} />
      <Outlet context={{ register, token, login, currUser }} />
    </div>
  );
}

export default App;
