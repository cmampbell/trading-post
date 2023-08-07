import React from 'react';
import { Typography, Button, Box, Stack } from '@mui/material';
import { useOutletContext } from 'react-router';

const HomePage = () => {
    const { currUser } = useOutletContext();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#edcf9b',
            height: '100vh',
            width: '100vw'
        }}>
            <Typography variant='h1' >Welcome to Trading Post!</Typography>
            <Stack spacing={4} sx={{ m: 5}}>
                <Button variant='contained' color='secondary' href="/trade">
                    Trade!
                </Button>
                {!currUser && <>
                                <Button variant='contained' color='secondary' href="/register">
                                Register!
                            </Button>
                            <Button variant='contained' color='secondary' href="/login">
                                Login!
                            </Button>
                </>}
                {currUser && <>
                    <Button variant='contained' color='secondary' href={`users/${currUser.id}`}>
                                View Profile!
                            </Button>
                </>}

            </Stack>
        </Box>
    )
}

export default HomePage;