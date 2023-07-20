import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import { useLoaderData, useOutletContext } from "react-router";
import { Link } from "react-router-dom";

/* This page should display a users profile.
*  We get the user from the loader function on the route,
* and populate the page with that data. 
* 
*/

const UserPage = () => {
    const {username, email, created_at: createdAt, id} = useLoaderData();
    const { currUser } = useOutletContext();

    const formatDate = (date) => {
        return date.substring(0, 10)
    }

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={4} sx={{ maxWidth: '40vw' }}>
                    <img
                        src="https://avatars.githubusercontent.com/u/114436937?v=4"
                        alt='User-avatar'
                        style={{ maxWidth: '100%', borderRadius: '100px' }}
                    />
                </Grid>
                <Grid item container xs={8}>
                    <Grid item xs={6}>
                        <Typography component="h3">
                            {username}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component="p">
                            {formatDate(createdAt)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography component="p">
                            {email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {currUser.id === id && <Link to={`/users/4/collection`}>Collection Link</Link>}
                    <Link to={`/users/4/collection`}>For-Trade Link</Link>
                    <Link to={`/users/4/collection`}>Want-List Link</Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserPage;