import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/* Input field meant for use with <CardForm/>
*
*  Props:
*       printings - array of card objects, representing every version of searched cardName.
*                   defaults to first card object in array.
*       card - currently selected card from printings.
*       setCard - function used to change card, based on the set that user selects.
*       updateCardData - function to update cardData in state based on user input. we use it
                         here to update foil value based on the newly selected cards foil options
*
*  We map through printings, creating <MenuItem/> for each card object in the array.
*
*  When a user selects an option from this field, we find the card in printings, based on the cards
*  unique setName and collectorNumber. When we find a match, we setCard to the found card object. We
*  then update the foilValue in cardData, to dynamically update the form based on the new card.
*
*  We set FIELD_NAME property on the function for use with useField.js
*/

const SetSelectField = ({ printings, card, setCard, updateCardData }) => {

    const handleChange = (evt) => {
        const { value } = (evt.target);
        const [setName, collectorNumber] = value.split('-');
        const newCard = printings.find((print) => print.set_name === setName && print.collector_number === collectorNumber);
        setCard(()=> newCard);
        const foilValue = newCard.usd_price ? 'No' : newCard.usd_foil_price ? 'Yes' : 'Etched';
        updateCardData('foil', foilValue );
    };

    return (
        <FormControl
            sx={{ m: 1, width: '100%' }}
            size="small"
        >
            <InputLabel id="set-select-label">Set</InputLabel>
            <Select
                labelId="set-select-label"
                id="set-select"
                value={`${card.set_name}-${card.collector_number}`}
                label="set"
                name="set"
                onChange={handleChange}
            >
                {/* render menu items for each version of the card found */}
                {printings.map((card) =>
                    <MenuItem
                        value={`${card.set_name}-${card.collector_number}`}
                        key={`${card.set_code}-${card.collector_number}`}
                    >{card.set_name} - #{card.collector_number}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

SetSelectField.FIELD_NAME = 'SetSelectField';

export default SetSelectField;