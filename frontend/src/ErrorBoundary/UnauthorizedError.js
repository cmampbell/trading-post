import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useParams, useOutletContext } from "react-router";

const UnauthorizedError = () => {
    const {currUser} = useOutletContext();
    const {userId} = useParams();

    return (
        <Container>
            <Typography variant="h4">Unauthorized</Typography>
            {!currUser &&  <><Typography variant="body1">
                Sorry, you must be logged in to view user profiles. Log in or create an account with the buttons below.
            </Typography>
            <Button href="/login">Log In</Button>
            <Button href="/register">Register</Button>
            </>
            }
            {currUser && currUser.id !== userId && <>
                <Typography variant="body1">
                Sorry, you only have access to your own collection. However, you can view this users For Trade and Want List with the buttons below.
            </Typography>
            <Button href={`/users/${userId}/want-list`}>Want List</Button>
            <Button href={`/users/${userId}/for-trade`}>For Trade</Button>
            </>}
        </Container>
    );
};

export default UnauthorizedError