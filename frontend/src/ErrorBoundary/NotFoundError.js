import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouteError } from "react-router";

const PageNotFoundError = () => {

    return (
        <Container sx={{marginTop: 4}}>
            <Typography variant="h4">Page Not Found</Typography>
            <Typography variant="body1">
                Sorry, looks like this page doesn't exist.
            </Typography>
        </Container>
    );
};

export default PageNotFoundError