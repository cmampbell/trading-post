import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardItem from './CardItem';
import AddCardModal from '../_common/AddCardModal/AddCardModal';
import SetSelectField from "../_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "../_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "../_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "../_common/CardForm/FormInputs/QuantitySelectField";

/* Display for a list of cards on TradePage.
*
*  Props:
*       cards - an array of card objects to display. We map over this to create an array of 
*               <CardItem/> for each card.
*       addToCardLists - function to add cards to the cards array, passed into <AddCardModal/>
*       removeFromCardLists - function to remove cards from the cards array, passed into <CardItem/>
*/

const CardList = ({ cards = [], addToCardLists, removeFromCardLists }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    return (
        <>
            <Button onClick={handleSearchOpen} variant="contained" sx={{ marginTop: '1vh' }} color='secondary'>Add Card</Button>
            <Stack spacing={1} sx={{ marginTop: '1vh', marginBottom: '3vh' }}>
                {cards.map((card, idx) => <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={removeFromCardLists} />)}
            </Stack>

            <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addToCardLists} fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
        </>
    );
};

export default CardList;