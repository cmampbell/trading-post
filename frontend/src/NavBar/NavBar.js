import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import theme from '../theme';
import NavMenu from './NavMenu';

const NavBar = ({ token, logout, currUser }) => {

    const navBarStyles = {
        wrapper : {
            backgroundColor: theme.palette.primary.main,
            alignItems: 'center',
            color: '#000000',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '18px',
            paddingRight: '18px'
        }
    }
    return (
            <Grid item container sx={navBarStyles.wrapper}>
                    <NavLink to='/' style={{color: '#000000', textDecoration: 'none', fontWeight: 'bold'}}>
                    Trading Post
                    </NavLink>
                <NavMenu token={token} logout={logout} currUser={currUser} />
            </Grid>
    );
}

export default NavBar;