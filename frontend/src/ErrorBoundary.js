import React from "react";
import { useRouteError } from "react-router";
import Container from "@mui/material/Container";

const ErrorBoundary = () => {
    const error = useRouteError();
    return (
        <Container>
            <h1>Hit an error!</h1>
            <p> {error} </p>
        </Container>
    )
}

export default ErrorBoundary;