import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

/* Not Found page.
*  Renders when the user tries to navigate to a route that doesn't exist.
*/

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

export default PageNotFoundError;