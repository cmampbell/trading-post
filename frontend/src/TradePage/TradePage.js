import React, { useState } from "react";
import { Grid, Button, Typography, IconButton } from "@mui/material"
import CardList from './CardList'
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";
import HelpIcon from '@mui/icons-material/Help';

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

    const handleClick = () => {
        setShowHelp((oldShowHelp) => !oldShowHelp);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1">
                    Trade Page
                </Typography>
                <IconButton onClick={handleClick}>
                    <HelpIcon />
                </IconButton>
                {showHelp && <>
                    <Typography variant="body1">{`1)`} Click the 'Add Card' button to add a card to the active list</Typography>
                    <Typography variant="body1">{`2)`} Once all cards are added to the active list, click on the other list to activate</Typography>
                    <Typography variant="body1">{`3)`} After all cards are added to each list, look at the price and decide whether to commit the trade!</Typography>
                </>}
            </Grid>
            <CardList activeList={activeList} makeActive={makeActive} side='left' key='left' fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
            <CardList activeList={activeList} makeActive={makeActive} side='right' key='right' fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
            <Grid item xs={12}>
                <Button variant="outlined" color="success">Commit Trade</Button>
            </Grid>
        </Grid>
    )
}

export default TradePage;