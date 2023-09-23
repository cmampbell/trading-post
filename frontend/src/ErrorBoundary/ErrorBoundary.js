import React from "react";
import { useRouteError } from "react-router";
import Container from "@mui/material/Container";
import UnauthorizedError from "./UnauthorizedError";
import UserNotFoundError from "./UserNotFoundError";

const ErrorBoundary = () => {
    const error = useRouteError();
    console.log(error)

    return (
        <Container maxWidth="sm">
            {error[0].status === 401 && <UnauthorizedError />}
            {error[0].status === 404 && <UserNotFoundError />}
            {/* Not sure if I like the home and trade buttons here */}
            {/* <Button href="/">Home</Button>
            <Button href="/trade">Trade</Button> */}
        </Container>
    )
}

export default ErrorBoundary;