// accordian of cards goes here
import React from 'react';
import { Grid } from "@mui/material"

const CardList = ({ activeList, makeActive, side }) => {
    return (
        <Grid item xs={activeList === side ? 8 : 4}>
            <div onClick={() => { makeActive(side) }}>
                <h1>Card list</h1>
                <ul>
                    <li>Card</li>
                </ul>
            </div>
        </Grid>
    )

}

export default CardList;