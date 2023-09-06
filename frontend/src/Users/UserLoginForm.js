import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

/* Controlled form used to handle user login.
*  We store input into state, and when the user hits submit,
*  we run a simple validation to check that they have some value
*  in each input. If it passes that, we then send a request to
*  backend API to check credentials. If it fails we display the error returned
*  from the API.
*
*  State:
*       formData - used to control the form inputs
*       errors - an object containing key-value pairs where key is the form name
*                and value is a boolean.
*
*  We get the login function from OutletContext provided in App.
*/

const UserLoginForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState({});
    const { login } = useOutletContext();

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(() => ({
            ...formData, [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let complete = true;
        for (let key in formData) {
            if (!formData[key]) {
                setErrors((oldErrors) => ({ ...oldErrors, [key]: true }));
                complete = false;
            };
        };
        if (complete) {
            try {
                await login(formData);
            } catch (err) {
                console.log(err)
                setErrors(() => [...err]);
            };
        };
    };

    return (
        <Box sx={{ height: '95vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h2'>Login</Typography>
            <Stack spacing={2} alignItems="center" sx={{ m: 2 }}>
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
                {errors instanceof Array &&
                    errors.map((error) =>
                        <Typography variant='subtitle2' color='error' key={`${error}-error`}>{error.charAt(0).toUpperCase() + error.slice(1)}</Typography>)}
                <Button onClick={handleSubmit} variant='contained'>Log In</Button>
            </Stack>
            <Typography variant="subtitle1">Don't have an account? Register <Link to='/register'>here </Link></Typography>
        </Box>
    );
};

export default UserLoginForm;