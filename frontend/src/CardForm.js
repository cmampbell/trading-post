import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";

const CardForm = ({ card, setCard, printings, handleClose, fields }) => {
    // This will move into form
    // const INITIAL_STATE = { printings: cards[0], condition: 'Lightly Played', foil: 'No', quantity: 1 };


    // set up INITIAL_STATE specifics here
    // We will always want foil and always want condition
    // Qty will always start at one
    // We will always want setSelect
    // To get set we need to have 

    const INITIAL_STATE = {quality: 'Lightly Played', quantity: card.quantity || 1}

    card.usd_price ? INITIAL_STATE.foil = 'No'
    : card.usd_foil_price ? INITIAL_STATE.foil = 'Yes'
        : INITIAL_STATE.foil = 'Etched';

    const [cardData, setCardData ] = useState(INITIAL_STATE);

    // update state based on input changes
    const updateCardData = (name, value) => {
        setCardData(oldCardData => ({...oldCardData, [name]: value}))
    }

    // add card object to list on click
    const handleClick = () => {
        // this function handles submitting the form
        console.log(cardData)
        // adding card requires userId, and card data
        // we can get userId from outletContext or passed in as prop

        // want to take cardData, combine it with card id

        // something like
        // addCard({id: card.id, ...cardData})

        //*********   OLD CODE **********************
        // const { card, condition: quality, foil, quantity } = card;
        // const price = foil === 'Etched' ? card.usd_etched_price
        //     : foil === 'Yes' ? card.usd_foil_price
        //         : card.usd_price;
        // addCard(card, { quality, foil, quantity, price });
        // setCard(() => ({}));
        // handleClose();
    }

    // make initial state from fields passed in
    // create inputState with initial state
    // break input fields into components
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

            {/* <Typography sx={{ m: 1 }}>
                {/* depending on the foil selection, render relevant price
                ${card.foil === "Yes" ? calcTotalPrice(card.card.usd_foil_price)
                    : card.foil === "Etched" ? calcTotalPrice(card.card.usd_etched_price)
                        : calcTotalPrice(card.card.usd_price)}
            </Typography> */}
            <Button onClick={handleClick}> Add Card! </Button>
        </Box>
    )
}

export default CardForm;