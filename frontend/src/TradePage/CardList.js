import React, { useState } from 'react';
import { Grid, Paper, Button, Stack, Typography } from "@mui/material";
import CardItem from './CardItem';
import AddCardModal from '../_common/AddCardModal/AddCardModal';
import PriceDisplay from '../_common/PriceDisplay';
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

const CardList = ({ activeList = 'left', makeActive, side = 'left', cards = [], color, value, addToCardLists, removeFromCardLists }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    return (
        <>
            <Stack spacing={.5}>
                {cards.map((card, idx) => <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={removeFromCardLists} />)}
            </Stack>
            {activeList === side && <Button onClick={handleSearchOpen} variant="outlined">Add Card</Button>}
            <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addToCardLists} fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
        </>
    )
}

export default CardList;