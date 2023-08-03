import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import ArchiveIcon from '@mui/icons-material/Archive';
import { NavLink } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonIcon from '@mui/icons-material/Person';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';

export default function SimpleBottomNavigation({ token, logout, currUser }) {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 5 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="User"
                    icon={<PersonIcon />}
                    component={NavLink}
                    to={currUser ? `/users/${currUser.id}` : '/login'} />
                <BottomNavigationAction
                    label="Trade"
                    icon={<SwapHorizIcon />}
                    component={NavLink}
                    to='/trade'
                />
                <BottomNavigationAction
                    label="Collection"
                    icon={<CropPortraitIcon />}
                    component={NavLink}
                    to={currUser ? `/users/${currUser.id}/collection` : '/login'}
                />
            </BottomNavigation>
        </Paper>
    );
}

// {!token &&
// [
//     <MenuItem onClick={handleClose} key='login'>
//         <NavLink to="/login" >
//             Login
//         </NavLink>
//     </MenuItem>,
//     <MenuItem onClick={handleClose} key='register'>
//         <NavLink to="/register" >
//             Register
//         </NavLink>
//     </MenuItem>
// ]}
// {token &&
// [
//     <MenuItem onClick={handleClose} key='user'>
//         <NavLink to={`/users/${currUser.id}`} >
//             {currUser.username}
//         </NavLink>
//     </MenuItem>,
//     <MenuItem key='collection' >
//         <NavLink to={`/users/${currUser.id}/collection`} >Collection</NavLink>
//     </MenuItem>,
//     <MenuItem key='trade list'>
//         <NavLink to={`/users/${currUser.id}/for-trade`} >Trade List</NavLink>
//     </MenuItem>,
//     <MenuItem key='want list'>
//         <NavLink to={`/users/${currUser.id}/want-list`} >Want List</NavLink>
//     </MenuItem>,
//     <MenuItem key='logout' onClick={() => { logout(); handleClose(); }}>
//         <NavLink to="#" >
//             Log Out
//         </NavLink>
//     </MenuItem>
// ]}