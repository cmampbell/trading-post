import React, { useState } from 'react';
import { Grid, Paper, Button, Stack } from "@mui/material";
import CardItem from './CardItem';
import AddCardModal from './AddCardModal'

const CardList = ({ activeList, makeActive, side }) => {
    const [listCards, setListCards] = useState([])
    const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchOpen = () => {
        setSearchOpen(true)
    }

    const sumTotalPrice = () => {
        const priceSum = listCards.reduce((sum, card)=> sum + (+card.price), 0)
        return priceSum.toFixed(2)
    }

    const deleteCard = (cardName) => {
        setListCards((oldCards)=> oldCards.filter((card)=> card.name !== cardName))
    }

    return (
        <Grid item xs={activeList === side ? 7 : 5}>
            {/* TODO: change paper drop shadow from black to blue */}
            <Paper elevation={activeList === side ? 4 : 1} onClick={() => makeActive(side) }>
                {/* TODO: change title from Card list to username if user logged in */}
                <h1>Card List</h1>
                <Stack spacing={.5}>
                {listCards.map((card, idx) => <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={deleteCard}/>)}
                </Stack>
                <p>Total Price: ${sumTotalPrice()}</p>
                {activeList === side && <Button onClick={handleSearchOpen} variant="outlined">Add Card</Button>}
                <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} setListCards={setListCards}/>
            </Paper>
        </Grid>
    )
}

export default CardList;