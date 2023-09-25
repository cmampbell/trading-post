import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

/* Not found error page for user routes.
*  This renders when the user tries to navigate to a user that does not exist.
*/

const UserNotFoundError = () => {
    return (
        <Container sx={{marginTop: 4}}>
            <Typography variant="h4">Page Not Found</Typography>
            <Typography variant="body1">
                Sorry, there is no such user with that id.
            </Typography>
        </Container>
    );
};

export default UserNotFoundError;