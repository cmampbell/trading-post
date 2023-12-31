import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";

/* Button that displays navigation options when clicked.
*
*  State:
*       anchorEl - the element to anchor the dropdown menu to
*
*  We use open to track whether the menu is open or closed.
*
*  On menu open, a dropdown appears with links used to navigate the site.
*  The options change depending on if the user is logged in or not.
*/

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
                sx={{ color: '#000000' }}
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
                            <NavLink to={`/users/${currUser.id}/collection`} >Collection</NavLink>
                        </MenuItem>,
                        <MenuItem key='trade list'>
                            <NavLink to={`/users/${currUser.id}/for-trade`} >Trade List</NavLink>
                        </MenuItem>,
                        <MenuItem key='want list'>
                            <NavLink to={`/users/${currUser.id}/want-list`} >Want List</NavLink>
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

