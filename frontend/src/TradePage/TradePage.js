import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TradeHelpModal from "./TradeHelpModal";
import HelpIcon from '@mui/icons-material/Help';
import CardListDisplay from "./CardListDisplay";

/* Parent component for trade page. 
*  Renders page title, <TradeHelpModal/>, and <CardListDisplay/>.
*
*  State:
*       - showHelp - boolean used to track <TradeHelpModal/> open status
*/
const TradePage = () => {
    const [showHelp, setShowHelp] = useState(false);

    const toggleHelpModal = () => {
        setShowHelp((oldShowHelp) => !oldShowHelp);
    };

    return (
        <Grid container spacing={2} sx={{ position: 'relative' }}>
            <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                    <Typography variant="h1">
                        Trade Page
                    </Typography>
                    <IconButton
                        onClick={toggleHelpModal}
                        sx={{
                            position: "absolute",
                            top: '25%',
                            right: '1%'
                        }}
                        color="info"
                    >
                        <HelpIcon />
                    </IconButton>
                </Box>
                <TradeHelpModal open={showHelp} toggleHelpModal={toggleHelpModal} />
            </Grid>
            <CardListDisplay />
        </Grid>
    );
};

export default TradePage;