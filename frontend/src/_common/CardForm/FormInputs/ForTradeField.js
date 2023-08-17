import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

/* Input field meant for use with <CardForm/>
*
*  Props:
*       cardData - piece of State from <CardForm/>, used to control input with state
*       updateCardData - function to update cardData in state based on user input.
*
*  Simple check box to set whether a user wants to list a card for trade or not.
*
*  We set FIELD_NAME property on the function for use with useField.js.
*/

const ForTradeField = ({ cardData, updateCardData }) => {

    const handleCheck = (evt) => {
        updateCardData('forTrade', evt.target.checked);
    };

    return (
        <FormControlLabel
            labelPlacement="end"
            value="end"
            label="For Trade"
            control={<Checkbox
                checked={cardData.forTrade || false}
                onChange={handleCheck}
                inputProps={{ 'aria-label': 'controlled' }} />} />
    );
};

ForTradeField.FIELD_NAME = 'ForTradeField';

export default ForTradeField;