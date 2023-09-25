import React from "react";
import { useRouteError } from "react-router";
import Container from "@mui/material/Container";
import UnauthorizedError from "./UnauthorizedError";
import UserNotFoundError from "./UserNotFoundError";


/* ErrorBoundary for user routes/
*  If API returns an error from a route loader in the user routes, you render this component
*  This component checks the error, and then decides which error component to render
*  Currently covers a user trying to access something they should not be able to acess,
*  and when the API can't find a user by an id.
*/

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <Container maxWidth="sm">
            {error[0].status === 401 && <UnauthorizedError />}
            {error[0].status === 404 && <UserNotFoundError />}
        </Container>
    )
}

export default ErrorBoundary;