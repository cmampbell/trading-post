import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UnauthorizedError = () => {
    return (
        <Container>
            <Typography variant="h4">Unauthorized</Typography>
            <Typography variant="body1">Sorry, you don't have permission to view this page</Typography>
        </Container>
    )
}

export default UnauthorizedError