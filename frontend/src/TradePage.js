import React, { useState } from "react";
import { Grid } from "@mui/material"

import CardList from './CardList'

const TradePage = () => {
    // Render two card list components
    // we can handle grid and formatting here

    // Render two CardList components
    // handle which list is active here

    const [activeList, setActiveList] = useState('left')

    const makeActive = (side) => {
        setActiveList(side)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h1>Trade Details</h1>
            </Grid>
            <CardList activeList={activeList} makeActive={makeActive} side='left'/>
            <CardList activeList={activeList} makeActive={makeActive} side='right'/>
        </Grid>
    )

    // Trade page title
    // 2 Card List Components
    // 1 left - current user will always be on right
    // left will always start active
    // 1 right - other user will be on the left
}

export default TradePage;