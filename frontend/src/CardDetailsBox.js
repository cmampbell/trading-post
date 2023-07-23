import React, { useState } from "react";
import { Box } from "@mui/material";
import CardForm from "./CardForm";
import SetSelectField from "./FormInputs/SetSelectField";
import FoilSelectField from "./FormInputs/FoilSelectField";
import QualitySelectField from "./FormInputs/QualitySelectField";
import QuantitySelectField from "./FormInputs/QuantitySelectField";

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
const CardDetailsBox = ({ printings, addCard, handleClose }) => {

    // the selected card
    const [card, setCard] = useState(printings[0]);

    // This can be moved into it's own price display component
    const calcTotalPrice = price => {
        return (price * card.quantity).toFixed(2);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            height: '100%',
            m: 2
        }}>
            {/* container for image */}
            {/* TODO: if card is foil add rainbow border to image */}
            <Box sx={{
                height: '30%',
                overflow: 'hidden',
            }}>
                <img
                    src={card.art_uri}
                    alt={`${card.name} art by ${card.artist}`}
                    style={{ width: 'auto', height: '100%' }}
                />

            </Box>
            <p style={{ fontSize: '9px', marginBottom: '-1%' }}>
                Illustrated by {card.artist}. &#8482; & &copy; Wizards Of The Coast, Inc.
            </p>

            <h3>{card.name}</h3>
            {/* Add form component here */}
            {/* Add context provider here */}
            <CardForm
                card={card}
                setCard={setCard}
                printings={printings}
                handleClose={handleClose}
                fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]}
                addCard={addCard}
            />
        </Box>
    )
}

export default CardDetailsBox;