// accordian of cards goes here
import React, { useState } from 'react';
import { Grid, Paper, Button } from "@mui/material";
import Card from './Card';

const CardList = ({ activeList, makeActive, side }) => {
    const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}
    const testCard2 = { name: 'Mountain', image_uri: 'test_uri', usd_price: '7.65', id: '2' , setCode: 'IXL'}
    const [cards, setCards] = useState([testCard, testCard2])

    // const [cards, setCards] = useState([])

    return (
        <Grid item xs={activeList === side ? 8 : 4}>
            {/* TODO: change paper drop shadow from black to blue */}
            <Paper elevation={4} onClick={() => { makeActive(side) }}>
                {/* TODO: change title from Card list to username if user logged in */}
                <h1>Card list</h1>
                {cards.map((card) => <Card card={card} key={card.id} />)}
                <p>Total Price: ${cards.reduce((sum, card)=> sum + (+card.usd_price), 0)}</p>
                <Button variant="outlined">Add Card</Button>
            </Paper>
        </Grid>
    )
}

export default CardList;