import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useOutletContext } from 'react-router';

/* Controlled form used to handle user registration.
*  We store input into state, and when the user hits submit,
*  we run a simple validation to check that they have some value
*  in each input. If it passes that, we then send a request to
*  backend API to register user. If it fails we display the errors returned
*  from the API.
*
*  State:
*       formData - used to control the form inputs
*       errors - an object containing key-value pairs where key is the form name
*                and value is a boolean.
*
*  We get the register function from OutletContext provided in App.
*/
const UserRegisterForm = () => {
    const INITIAL_STATE = {
        username: '',
        password: '',
        email: ''
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState({});
    const { register } = useOutletContext();

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(() => ({
            ...formData, [name]: value
        }))
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let complete = true;
        for (let key in formData) {
            if (!formData[key]) {
                setErrors((oldErrors) => ({ ...oldErrors, [key]: true }));
                complete = false;
            }
        };
        if (complete) {
            try {
                await register(formData);
            } catch (err) {
                console.log(err)
                setErrors(() => [...err])
            };
        };
    };

    return (
        <Box sx={{ height: '95vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h2'>Register</Typography>
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
                {errors instanceof Array && errors.map((error) => <Typography variant='subtitle2' color='error' key={`${error}-error`}>{error.charAt(0).toUpperCase() + error.slice(1)}</Typography>)}
                <Button variant='contained' onClick={handleSubmit}>Register!</Button>
            </Stack>
        </Box>
    );
};

export default UserRegisterForm;