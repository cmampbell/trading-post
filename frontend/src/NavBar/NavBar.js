import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Grid, Container, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../theme';
import NavMenu from './NavMenu';

const NavBar = ({ token, logout, currUser }) => {

    const navBarStyles = {
        wrapper : {
            backgroundColor: theme.palette.primary.main,
            alignItems: 'center',
            color: '#fff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '18px',
            paddingRight: '18px'
        }
    }
    return (
            <Grid item container sx={navBarStyles.wrapper} color="primary">
                    <NavLink to='/' style={{color: '#fff', textDecoration: 'none', fontWeight: 'bold'}}>
                    Trading Post
                    </NavLink>
                <NavMenu token={token} logout={logout} currUser={currUser}/>
            </Grid>
    );
}

export default NavBar;