import React, { useState } from "react";
import { Grid, Button } from "@mui/material"

import CardList from './CardList'

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
            <CardList activeList={activeList} makeActive={makeActive} side='left' key='left'/>
            <CardList activeList={activeList} makeActive={makeActive} side='right' key='right'/>
            <Grid item xs={12}>
                <Button variant="outlined" color="success">Commit Trade</Button>
            </Grid>
        </Grid>
    )
}

export default TradePage;