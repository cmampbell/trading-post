import React from "react";
import { useRouteError } from "react-router";
import Container from "@mui/material/Container";
import UnauthorizedError from "./UnauthorizedError";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <Container maxWidth="sm">
            <Typography variant="body1">Uh oh. We've encountered an issue.</Typography>
            {error[0] === 'Unauthorized' && <UnauthorizedError />}
            <Button href="/">Home</Button>
            <Button href="/trade">Trade</Button>
        </Container>
    )
}

export default ErrorBoundary;