import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'
import { useOutletContext } from 'react-router';

/* user form needs to take data for:
*  username, password, email
*/
const UserRegisterForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        email: ''
    };

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [errors, setErrors] = useState({})
    const { register } = useOutletContext()

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(() => ({
            ...formData, [name]: value
        }
        ))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let complete = true;
        for( let key in formData){
            if(!formData[key]){
                setErrors((oldErrors)=> ({...oldErrors, [key]: true}));
                complete = false;
            }
        }
        if(complete){
            try{
                await register(formData);
            } catch (err) {
                console.log(err)
                setErrors(()=> [...err])
            }
        }
    }

    return (
        <>
            <h1>User Register Form</h1>
            <form>
                <TextField
                    required
                    name='username'
                    value={formData.username}
                    id="Username"
                    label="Username"
                    variant="standard"
                    helperText="Required"
                    onChange={handleChange}
                    error={errors.username}
                />
                <TextField
                    required
                    name='password'
                    value={formData.password}
                    id="Password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    helperText="Required"
                    onChange={handleChange}
                    error={errors.password}
                />
                <TextField
                    required
                    name='email'
                    value={formData.email}
                    id="Email"
                    label="Email"
                    variant="standard"
                    helperText="Required"
                    onChange={handleChange}
                    error={errors.email}
                />
                {errors[0] && errors.map((error)=> <p style={{color: 'red'}} key={`${error}-error`}>{error.charAt(0).toUpperCase() + error.slice(1)}</p>)}
                <Button onClick={handleSubmit}>Register!</Button>
            </form>
        </>
    )
};

export default UserRegisterForm;