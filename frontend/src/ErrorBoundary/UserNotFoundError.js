import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams, useRouteError } from "react-router";

const PageNotFoundError = () => {
    const { userId } = useParams();

    return (
        <Container sx={{marginTop: 4}}>
            <Typography variant="h4">Page Not Found</Typography>
            <Typography variant="body1">
                Sorry, there is no user with id {userId}.
            </Typography>
        </Container>
    );
};

export default PageNotFoundError