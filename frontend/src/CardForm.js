import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import PriceDisplay from "./PriceDisplay";

/* This form should be used across Collection, Trade, and Want List pages.
*
*  Props:
*       fields - an Array of input field components. The form will create an initial state
*                from these fields in order to keep the inputs controlled by state. These can
*                 be found in the FormInputs directory.
*                 
*       printings - an array of card ids for printings of cards that share an oracle id.
*                    necessary for set select form.
*
*  
*/

const CardForm = ({ card, setCard, printings, handleClose, fields, addCard }) => {
    const INITIAL_STATE = {quality: 'Lightly Played', quantity: card.quantity || 1}

    // need to be able to create INITIAL_STATE from fields
    // fields is an array of components
    // key in INITIAL_STATE needs to match name on input label
    // fields could be an array of objects linking names to components, and initial values
    

    card.usd_price ? INITIAL_STATE.foil = 'No'
    : card.usd_foil_price ? INITIAL_STATE.foil = 'Yes'
        : INITIAL_STATE.foil = 'Etched';

    const [cardData, setCardData ] = useState(INITIAL_STATE);

    // update state based on input changes
    const updateCardData = (name, value) => {
        setCardData(oldCardData => ({...oldCardData, [name]: value}))
        setCard(oldCard => ({...oldCard, [name]: value}))
    }

    // add card object to list on click
    const handleClick = () => {
        // this function handles submitting the form
        addCard(card, cardData);
        setCard(() => ({}));
        handleClose();
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            width: '80%',
            height: 'auto'
        }}>

            {fields.map((Field, idx) => <Field key={idx} cardData={cardData} updateCardData={updateCardData} card={card} setCard={setCard} printings={printings}/>)}
            <PriceDisplay card={card} />
            <Button onClick={handleClick}> Add Card! </Button>
        </Box>
    )
}

export default CardForm;