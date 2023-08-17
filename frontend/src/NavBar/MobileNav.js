import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { NavLink } from "react-router-dom";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonIcon from '@mui/icons-material/Person';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';

/* Mobile NavBar component.
*  Allows user to easily navigate from trade page, user profile, and their collection.
*/

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
};