import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ token, logout }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Grid container>
            <Grid item xs={8}>
                Trading Post
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
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
                    {!token &&
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/login" >
                                Login
                            </NavLink>
                        </MenuItem>
                    }
                                        {!token &&
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/register" >
                                Register
                            </NavLink>
                        </MenuItem>
                    }
                    {token &&
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/user" >
                                My Account
                            </NavLink>
                        </MenuItem>}
                    {token &&
                        <MenuItem onClick={() => { logout(); handleClose(); }}>
                            <NavLink to="#" >
                                Log Out
                            </NavLink>
                        </MenuItem>}

                </Menu>
            </Grid>
        </Grid>
    );
}

export default NavBar;