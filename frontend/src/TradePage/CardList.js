import React, { useState } from 'react';
import { Grid, Paper, Button, Stack } from "@mui/material";
import CardItem from './CardItem';
import AddCardModal from '../_common/AddCardModal/AddCardModal';
import PriceDisplay from '../_common/PriceDisplay';
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

const CardList = ({ activeList = 'left', makeActive, side = 'left', cards = [], color, value, addToCardLists, removeFromCardLists }) => {
    const [listCards, setListCards] = useState(cards);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    const deleteCard = (cardId) => {
        setListCards((oldCards) => oldCards.filter((card) => card.id !== cardId));
        removeFromCardLists(value, cardId)
    }

    const addCardToList = (card, cardData) => {
        setListCards((oldListCards) => [...oldListCards, { ...card, ...cardData }]);
        addToCardLists(value, { ...card, ...cardData })
    }

    return (
        <>
            <Stack spacing={.5}>
                {cards.map((card, idx) => <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={deleteCard} />)}
            </Stack>
            <PriceDisplay cards={cards} />
            {activeList === side && <Button onClick={handleSearchOpen} variant="outlined">Add Card</Button>}
            <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addCardToList} fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
        </>
    )
}

export default CardList;