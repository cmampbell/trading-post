import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PriceDisplay from "../PriceDisplay";
import useFields from "./useFields";

/* This form should be used across Collection, Trade, and Want List pages.
*  This is a dynamic form. It accepts an array of fields and populates the form
*  with those fields, along with initializing a peice of state to control form
*  inputs.
*
*  Props:
*       card - the card that populates the form. passed from <CardCollectionItem/> or <AddCardModal/>.
*       printings - an array of card ids for printings of cards that share an oracle id.
*                   needs to be passed into <SetSelectFields/>
*       setCard - function to update card in parent state.
*       addCard - function passed from the parent <CardBinder/> or <CardList/>
*                 component. Used on form submit to send cardData to ancestor component
*                 handling API calls.
*       handleClose - closes editForm or AddCardModal on submit
*       fields - array of FormInput components. These should come from the ancestor component
*                that interacts with the API. We call useFields and pass this as an argument
*                in order to create our INTIAL_STATE to control our form. We then map through
*                these to create our form inputs.
*       type - string used to make sure the submit button displays the correct text. Should be
*               'Add' or 'Edit'
*/

const CardForm = ({ card, printings, setCard, addCard, handleClose, fields, type }) => {
    // create INITIAL_STATE from fields prop and card
    const [cardData, setCardData] = useState(useFields(fields, card));

    // update state based on input changes
    const updateCardData = (name, value) => {
        setCardData(oldCardData => ({ ...oldCardData, [name]: value }));
        if (setCard) setCard(oldCard => ({ ...oldCard, [name]: value }));
    };

    // add card object to list on click
    const handleClick = () => {
        // this function handles submitting the form
        addCard(card, cardData);
        if (setCard) setCard(() => ({}));
        handleClose();
    };

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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'flex-start',
                width: '95%',
                height: 'auto'
            }} >

                {fields && fields.length > 0 && fields.map((Field, idx) => <Field key={idx} cardData={cardData} updateCardData={updateCardData} card={card} setCard={setCard} printings={printings} />)}
                <PriceDisplay card={card} formData={cardData} />
            </Box>
            <Button variant='contained' onClick={handleClick} >{type} Card!</Button>
        </Box>
    );
};

export default CardForm;