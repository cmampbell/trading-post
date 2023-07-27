import React, { useState } from "react";
import { Grid, Button, Typography, IconButton, Box } from "@mui/material"
import CardList from './CardList'
import TradeHelpModal from "./TradeHelpModal";
import HelpIcon from '@mui/icons-material/Help';
import CardListDisplay from "./CardListDisplay";

/* Parent component for trading functionality. 
* 
* Only the active list is able to add cards. Users can
* change which list is active with a click.
*
* Lists are labeled left and right.
*/
const TradePage = () => {

    const [activeList, setActiveList] = useState('left')
    const [showHelp, setShowHelp] = useState(false);

    const makeActive = (side) => {
        setActiveList(side)
    }

    const toggleHelpModal = () => {
        setShowHelp((oldShowHelp) => !oldShowHelp);
    }

    // Make active should have larger z-index
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
                        color="primary"
                    >
                        <HelpIcon />
                    </IconButton>
                </Box>
                <TradeHelpModal open={showHelp} toggleHelpModal={toggleHelpModal} />
            </Grid>
            <CardListDisplay />
            {/* Put tabs here, clicking tabs switches active list */}
            {/* <Grid item xs={12}>
                <Button onClick={() => makeActive('left')}>List 1</Button>
                <Button onClick={() => makeActive('right')}>List 2</Button>
            </Grid>
            <Grid item xs={12} sx={{position: 'relative'}}>
                <CardList activeList={activeList} makeActive={makeActive} side={'left'} color="primary" />
                <CardList activeList={activeList} makeActive={makeActive} side={'right'} color="secondary" />
            </Grid> */}

            <Grid item xs={12}>
                <Button variant="outlined" color="success">Commit Trade</Button>
            </Grid>
        </Grid>
    )
}

export default TradePage;