import React, { useState } from 'react';
import { Button, Stack } from "@mui/material";
import CardItem from './CardItem';
import AddCardModal from '../_common/AddCardModal/AddCardModal';
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

const CardList = ({ cards = [], addToCardLists, removeFromCardLists }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    return (
        <>
        <Button onClick={handleSearchOpen} variant="outlined" sx={{marginTop: '1vh'}} color='secondary'>Add Card</Button>
            <Stack spacing={1} sx={{marginTop: '1vh', marginBottom: '3vh'}}>
            
                {cards.map((card, idx) => <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={removeFromCardLists} />)}
            </Stack>
             
            <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addToCardLists} fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
        </>
    )
}

export default CardList;