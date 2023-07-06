import { Box } from "@mui/material";
import React from "react";

const CardDetailsBox = ({ cards }) => {
    // what we want to see
    // card name under card image
    // set dropdown to choose set
    // based on set, price will change
    // quality drop down
    // quality shoud change price based on modifiers
    // need to figure out modifier percentages
    // printing
    // if foil use foil price
    // Price
    // price display

    // Add Card button
    // should add card object to Card List (remember that????)

    // this needs to be a controlled form
    return (
        <>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '90%',
                    height: '100%',
                    margin: '2%'
            }}>
                <Box sx={{
                    height: '20%',
                    overflow: 'hidden',
                }}>
                    <img src={cards[0].art_uri} style={{ width: 'auto', height: '100%' }} />
                </Box>

                <h3> {cards[0].name}</h3>
            </Box>
        </>
    )
}

export default CardDetailsBox;

// width: '50%', height: '50%'