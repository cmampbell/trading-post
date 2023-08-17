import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

/* Input field meant for use with <CardForm/>
*
*  Props:
*       cardData - piece of State from <CardForm/>, used to control input with state
*       updateCardData - function to update cardData in state based on user input
*       card - card user has selected, used here to get foil printings for cards
*
*  We check if the card has foil options, and if so, then we check which options
*  are available for the card, and use those options to create the options for
*  our select menu. This creates a dynamic form input that updates options as card
*  printings change.
*
*  We set FIELD_NAME property on the function for use with useField.js
*/

const FoilSelectField = ({ cardData, updateCardData, card }) => {

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        updateCardData(name, value);
    }

    const checkFoilOptions = (card) => card.usd_price || card.usd_foil_price || card.usd_etched_price ? true : false;

    const getFoilOptions = (card) => {
        const options = [];
        if (card.usd_price) options.push('No');
        if (card.usd_foil_price) options.push('Yes');
        if (card.usd_etched_price) options.push('Etched');

        return options;
    };

    return (
        <FormControl
            sx={{ m: 1, width: '100%' }}
            size="small"
        >
            <InputLabel id="foil-select-label">Foil</InputLabel>
            <Select
                labelId="foil-select-label"
                id="foil-select"
                value={cardData.foil || ''}
                label="foil"
                name="foil"
                onChange={handleChange}
            >
                {checkFoilOptions && getFoilOptions(card)
                    .map((option) => <MenuItem
                        value={option}
                        key={option}
                        data-testid={`${option}-test`}>
                        {option}
                    </MenuItem>)}
                {!checkFoilOptions && <MenuItem value='' key=''></MenuItem>}
            </Select>
        </FormControl>
    )
};

FoilSelectField.FIELD_NAME = 'FoilSelectField';

export default FoilSelectField;