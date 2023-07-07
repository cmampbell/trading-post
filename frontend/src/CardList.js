import React, { useState } from 'react';
import { Grid, Paper, Button } from "@mui/material";
import Card from './Card';
import AddCardModal from './AddCardModal'

const CardList = ({ activeList, makeActive, side }) => {
    const [listCards, setListCards] = useState([])
    const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchOpen = () => {
        setSearchOpen(true)
    }

    return (
        <>
        <Grid item xs={activeList === side ? 8 : 4}>
            {/* TODO: change paper drop shadow from black to blue */}
            <Paper elevation={4} onClick={() => { makeActive(side) }}>
                {/* TODO: change title from Card list to username if user logged in */}
                <h1>Card list</h1>
                {listCards.map((card) => <Card card={card} key={card.id} />)}
                <p>Total Price: ${listCards.reduce((sum, card)=> sum + (+card.usd_price), 0)}</p>
                {activeList === side && <Button onClick={handleSearchOpen} variant="outlined">Add Card</Button>}
                <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} setListCards={setListCards}/>
            </Paper>
        </Grid>
        </>
    )
}

export default CardList;