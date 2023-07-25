import React, { useState } from "react";
import { Grid, Button } from "@mui/material"
import CardList from './CardList'

/* Parent component for trading functionality. 
* 
* Only the active list is able to add cards. Users can
* change which list is active with a click.
*
* Lists are labeled left and right.
*/
const TradePage = ({ fields }) => {

    const [activeList, setActiveList] = useState('left')

    const makeActive = (side) => {
        setActiveList(side)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Trade Details</h1>
            </Grid>
            <CardList activeList={activeList} makeActive={makeActive} side='left' key='left' fields={fields}/>
            <CardList activeList={activeList} makeActive={makeActive} side='right' key='right' fields={fields}/>
            <Grid item xs={12}>
                <Button variant="outlined" color="success">Commit Trade</Button>
            </Grid>
        </Grid>
    )
}

export default TradePage;