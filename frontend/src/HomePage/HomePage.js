import React from 'react';
import { Container, Typography, Link, Button, Box, Stack } from '@mui/material';

const HomePage = () => {
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
                <Button variant='contained' color='secondary' href="/register">
                    Register!
                </Button>
                <Button variant='contained' color='secondary' href="/login">
                    Login!
                </Button>
            </Stack>

            {/* <Typography paragraph variant='body1'>
                If you want to get trading, click here: 
                <Link href="/trade"> Trade!</Link>
            </Typography>
            <Typography paragraph variant="body1">
                We also allow you to track your collection. To do so, you first need to make an account here: 
                <Link href="/register"> Register!</Link>
            </Typography> */}
        </Box>
    )
}

export default HomePage;