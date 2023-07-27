import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";

const NavMenu = ({ token, logout, currUser }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Grid item xs={1}>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: '#fff' }}
                size="large"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to='/trade' >Trade</NavLink>
                </MenuItem>
                {!token &&
                    [
                        <MenuItem onClick={handleClose} key='login'>
                            <NavLink to="/login" >
                                Login
                            </NavLink>
                        </MenuItem>,
                        <MenuItem onClick={handleClose} key='register'>
                            <NavLink to="/register" >
                                Register
                            </NavLink>
                        </MenuItem>
                    ]}
                {token &&
                    [
                        <MenuItem onClick={handleClose} key='user'>
                            <NavLink to={`/users/${currUser.id}`} >
                                {currUser.username}
                            </NavLink>
                        </MenuItem>,
                        <MenuItem key='collection' >
                            <NavLink to={`/users/4/collection`} >Collection</NavLink>
                        </MenuItem>,
                        <MenuItem key='want list'>
                            <NavLink to={`/users/4/collection`} >Want List</NavLink>
                        </MenuItem>,
                        <MenuItem key='logout' onClick={() => { logout(); handleClose(); }}>
                            <NavLink to="#" >
                                Log Out
                            </NavLink>
                        </MenuItem>
                    ]}


            </Menu>
        </Grid>
    )
}

export default NavMenu;

