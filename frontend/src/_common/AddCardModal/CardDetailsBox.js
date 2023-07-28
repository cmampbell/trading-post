import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CardForm from "../CardForm/CardForm";

/* 
*  Returns MUI box component with several input boxes and a button.
*  
*  Only rendered after user has selected a card from the search bar
*
*  User can fill out inputs to enter any details about the card that
*  will affect the price, i.e. set printing, foil status, condition
*
*  Displays the name and artwork from the selected card, so user can see visual
*  confirmation that card art from db matches their physical card. The first card
*  from cards prop will be displayed initially.
*  
*  The Add Cards button will add the current card to the CardList
*  that opened the AddCardModal, clear any state in this component,
*  and close the Modal.
*
*  Card Details box should only care about which card is selected
*  It can feed the art into the image container, and the card options into the form.
*  Form component will handle options, it only need to send back which card is selected
*  from set input.
*/
const CardDetailsBox = ({ printings, addCard, handleClose, fields }) => {

    // the selected card
    const [card, setCard] = useState(printings[0]);

    // set borderStyles based on card input
    const borderStyles = card.foil === 'Yes' || card.foil === 'Etched' ? {
            border: '3px solid transparent',
            borderImage: 'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            borderImageSlice: 1,
        }
            : {
                border: 2,
                borderColor: 'black',
                width: 'auto',
            }


return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        m: 2
    }}>
        {/* container for image */}
        {/* TODO: if card is foil add rainbow border to image */}
        <Box sx={{
            height: '30%',
            overflow: 'hidden',
            ...borderStyles
        }}>
            <img
                src={card.art_uri}
                alt={`${card.name} art by ${card.artist}`}
                style={{ width: 'auto', height: '100%' }}
            />

        </Box>
        <Typography variant='subtitle2' sx={{m:1, fontSize: '11px'}}>
            Illustrated by {card.artist}. &#8482; & &copy; Wizards Of The Coast, Inc.
        </Typography>

<Typography variant='h6'>{card.name}</Typography>
        {/* Add form component here */}
        {/* Add context provider here */}
        <CardForm
            card={card}
            setCard={setCard}
            printings={printings}
            handleClose={handleClose}
            fields={fields}
            addCard={addCard}
        />
    </Box>
)
}

export default CardDetailsBox;