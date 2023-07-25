import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const HomePage = () => {
    return (
        <Container>
            <Typography component='h1'>Welcome to Trading Post!</Typography>
            <Typography paragraph variant='body1'>
                If you want to get trading, click here: 
                <Link href="/trade"> Trade!</Link>
            </Typography>
            <Typography paragraph variant="body1">
                We also allow you to track your collection. To do so, you first need to make an account here: 
                <Link href="/register"> Register!</Link>
            </Typography>
        </Container>
    )
}

export default HomePage;