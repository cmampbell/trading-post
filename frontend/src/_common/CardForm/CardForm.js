import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PriceDisplay from "../PriceDisplay";
import useFields from "./useFields"

/* This form should be used across Collection, Trade, and Want List pages.
*
*  Props:
*       card - the card that populates the form. passed from CardCollectionItem or AddCardModal.
*
*       setCard - updates card in parent state. If we have this, then we know we are working 
*                  in an edit form and not an add form. Need to update the card object with
*                  form input changes
*
*       printings - an array of card ids for printings of cards that share an oracle id.
*                    necessary for set select form.
*
*       handleClose - closes editForm or AddCardModal on submit
*
*       fields - an Array of input field components. with useFields we create an initial state
*                from fields, and use it to keep the inputs controlled by state. These can
*                be found in the FormInputs directory. We map over the array to create the
*                input elements.
*
*       addCard - needs a better name. This function is passed from the parent CardBinder or CardList
*                  component. It sends the card and card data up to parent, then parent sends that data
*                  to the API. Can add cards to db or edit cards in db depending on form
*
*/

const CardForm = ({ card, setCard, printings, handleClose, fields, addCard, type }) => {
    // create INITIAL_STATE from fields prop and card
    const [cardData, setCardData] = useState(useFields(fields, card));

    // update state based on input changes
    const updateCardData = (name, value) => {
        setCardData(oldCardData => ({ ...oldCardData, [name]: value }))
        if (setCard) setCard(oldCard => ({ ...oldCard, [name]: value }))
    }

    // add card object to list on click
    const handleClick = () => {
        // this function handles submitting the form
        addCard(card, cardData);
        if (setCard) setCard(() => ({}));
        handleClose();
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            width: '90%',
            height: 'auto'
        }}>
            <Box sx={{display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            width: '95%',
            height: 'auto'}} >

                {fields && fields.length > 0 && fields.map((Field, idx) => <Field key={idx} cardData={cardData} updateCardData={updateCardData} card={card} setCard={setCard} printings={printings} />)}
                <PriceDisplay card={card} formData={cardData} />
            </Box>

            <Button variant='contained'  onClick={handleClick} >{type} Card!</Button>
        </Box>
    )
}

export default CardForm;