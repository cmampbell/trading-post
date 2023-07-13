import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { TextField, Button } from '@mui/material';

const UserLoginForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState({})
    const { login } = useOutletContext();

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(() => ({
            ...formData, [name]: value
        }
        ));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let complete = true;
        for (let key in formData) {
            if (!formData[key]) {
                setErrors((oldErrors) => ({ ...oldErrors, [key]: true }));
                complete = false;
            }
        }
        if (complete) {
            try {
                await login(formData);
            } catch (err) {
                setErrors(() => [...err]);
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
                {errors[0] && errors.map((error) => <p style={{ color: 'red' }} key={`${error}-error`}>{error.charAt(0).toUpperCase() + error.slice(1)}</p>)}
                <Button onClick={handleSubmit}>Register!</Button>
            </form>
        </>
    )
}

export default UserLoginForm;