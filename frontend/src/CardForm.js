import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PriceDisplay from "./PriceDisplay";
import useFields from "./useFields";

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
    // create INITIAL_STATE from fields prop and card
    const [cardData, setCardData ] = useState(useFields(fields, card));

    // update state based on input changes
    const updateCardData = (name, value) => {
        setCardData(oldCardData => ({...oldCardData, [name]: value}))
        if(setCard) setCard(oldCard => ({...oldCard, [name]: value}))
    }

    // add card object to list on click
    const handleClick = () => {
        // this function handles submitting the form
        addCard(card, cardData);
        if(setCard) setCard(() => ({}));
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

            {fields.length > 0 && fields.map((Field, idx) => <Field key={idx} cardData={cardData} updateCardData={updateCardData} card={card} setCard={setCard} printings={printings}/>)}
            <PriceDisplay card={card} formData={cardData} />
            <Button onClick={handleClick}> Add Card! </Button>
        </Box>
    )
}

export default CardForm;