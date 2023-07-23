import React, { useState } from 'react';
import { useOutletContext } from 'react-router';
import { Grid, Paper, Button, Stack } from "@mui/material";
import CardItem from './CardItem';
import AddCardModal from './AddCardModal'
import PriceDisplay from './PriceDisplay';
import SetSelectField from "./FormInputs/SetSelectField";
import FoilSelectField from "./FormInputs/FoilSelectField";
import QualitySelectField from "./FormInputs/QualitySelectField";
import QuantitySelectField from "./FormInputs/QuantitySelectField";

const CardList = ({ activeList='left', makeActive, side='left', cards=[], fields }) => {
    const [listCards, setListCards] = useState(cards);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    const deleteCard = (cardName) => {
        setListCards((oldCards)=> oldCards.filter((card)=> card.name !== cardName));
    }

    const addCardToList = (card, cardData) => {
        setListCards((oldListCards) => [...oldListCards, {...card, ...cardData}]);
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
                <PriceDisplay cards={listCards} />
                {activeList === side && <Button onClick={handleSearchOpen} variant="outlined">Add Card</Button>}
                <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addCardToList} fields={fields}/>
            </Paper>
        </Grid>
    )
}

export default CardList;