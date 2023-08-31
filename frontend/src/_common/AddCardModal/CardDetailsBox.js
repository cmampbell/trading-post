import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardForm from "../CardForm/CardForm";

/* Returns MUI box component with several input boxes and a button.
*  
*  Rendered in AddCardModal after user has selected a card using <Searchbar/>
*
*  state:
*      card - the active card selected from printings.
*             Initially the first card object element in printings.
*
*  props:
*        printings - printings of card selected with <Searchbar />, returned from API
*        addCard - function used to add card to relevant memory.
*                State for trade page.
*                db for <CardBinder/> pages.
*        handleClose - function to close modal on form submit
*        fields - fields for <CardForm/>
*
*  Displays the name and artwork from the selected card, so user can see visual
*  confirmation that card art from db matches their physical card.
*
*  The artwork will have a black border for non-foil cards, and a rainbow border
*  for foil cards. User can change foil type in <CardForm/>
*
*  Renders <CardForm/>, which requires fields as a prop.
*
*  <CardDetailsBox /> should only care about which card is selected.
*/
const CardDetailsBox = ({ printings, addCard, handleClose, fields }) => {

    const [card, setCard] = useState(printings[0]);

    const borderStyles = card.foil === 'Yes' || card.foil === 'Etched' ?
        {
            border: '5px solid transparent',
            borderImage: 'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            borderImageSlice: 1,
        }
        : {
            border: 5,
            borderColor: 'black',
            borderRadius: '10px'
        };

    return (
            <Box sx=
                {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginTop: 4,
                }}
            >
                {/* container for image */}
                <Box sx={{
                    height: 250,
                    width: 'auto',
                    overflow: 'hidden',
                    ...borderStyles
                }}>
                    <img
                        src={card.art_uri}
                        alt={`${card.name} art by ${card.artist}`}
                        style={{
                            width: 'auto',
                            height: '100%',
                         }}
                    />
                </Box>
                <Typography variant='subtitle2' sx={{ m: 1, fontSize: '11px' }}>
                    Illustrated by {card.artist}. &#8482; & &copy; Wizards Of The Coast, Inc.
                </Typography>

                <Typography variant='h6'>{card.name}</Typography>
                {/* TO-DO: Add context provider here */}
                <CardForm
                    card={card}
                    setCard={setCard}
                    printings={printings}
                    handleClose={handleClose}
                    fields={fields}
                    addCard={addCard}
                    type={'Add'}
                />
            </Box>
    )
}

export default CardDetailsBox;