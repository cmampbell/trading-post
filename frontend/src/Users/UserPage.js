import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useLoaderData, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

/* This page should display a users profile.
*  We get the user from the loader function on the route,
* and populate the page with that data. 
* 
*/

const UserPage = () => {
    const { username, email, created_at: createdAt, id } = useLoaderData();
    const { currUser, logout } = useOutletContext();

    const formatDate = (date) => {
        return date.substring(0, 10)
    }

    return (
        <Container sx={{ m: 2 }}>
            <Grid container spacing={1}>
                {/* TODO: Add in profile picture upload and file system image storage */}
                {/* <Grid item xs={4} sx={{ maxWidth: '40vw' }}>
                    <img
                        src="https://avatars.githubusercontent.com/u/114436937?v=4"
                        alt='User-avatar'
                        style={{ maxWidth: '100%', borderRadius: '100px' }}
                    />
                </Grid> */}
                <Grid item container xs={12} sx={{ textAlign: 'left' }} spacing={1}>
                    <Grid item xs={9} >
                        <Typography variant="h2" >
                            {username}
                        </Typography>
                    </Grid>
                    {currUser.id === id && <>
                        <Grid item xs={2}>
                            <Button size='small' variant="contained" onClick={logout}>Logout</Button>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography variant='body1'>
                                {email}
                            </Typography>
                        </Grid>
                    </>}
                    <Grid item md={6} xs={12}>
                        <Typography variant='body2'>
                            Joined: {formatDate(createdAt)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{ m: 1 }}>
                        View {username[username.length - 1] === 's' ? `${username}'` : `${username}'s`}
                    </Typography>
                    <ButtonGroup size='large' variant='contained' aria-label="contained primary large button group">
                        {currUser.id === id &&
                            <Button component={Link} to={`/users/${id}/collection`}>
                                Collection
                            </Button>}
                        <Button component={Link} to={`/users/${id}/for-trade`}>
                            Cards For Trade
                        </Button>
                        <Button component={Link} to={`/users/${id}/want-list`}>
                            Want List
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserPage;