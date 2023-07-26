import React, { useState } from "react";
import { Grid, Button } from "@mui/material"
import CardList from './CardList'
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

/* Parent component for trading functionality. 
* 
* Only the active list is able to add cards. Users can
* change which list is active with a click.
*
* Lists are labeled left and right.
*/
const TradePage = () => {

    const [activeList, setActiveList] = useState('left')

    const makeActive = (side) => {
        setActiveList(side)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Trade Details</h1>
            </Grid>
            <CardList activeList={activeList} makeActive={makeActive} side='left' key='left' fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]}/>
            <CardList activeList={activeList} makeActive={makeActive} side='right' key='right' fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]}/>
            <Grid item xs={12}>
                <Button variant="outlined" color="success">Commit Trade</Button>
            </Grid>
        </Grid>
    )
}

export default TradePage;