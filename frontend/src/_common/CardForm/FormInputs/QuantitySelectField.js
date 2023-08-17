import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

/* Input field meant for use with <CardForm/>
*
*  Props:
*       cardData - piece of State from <CardForm/>, used to control input with state
*       updateCardData - function to update cardData in state based on user input
*
*  readOnly TextField that's value can be changed with + and - buttons.
*  Value can not be below 1, to prevent a user from trading or owning 0 copies
*  of a card.
*
*  We set FIELD_NAME property on the function for use with useField.js
*/

const QuantitySelectField = ({ cardData, updateCardData }) => {

    const changeQty = (num) => {
        if (cardData.quantity + num < 1) return
        let newQty = cardData.quantity;
        newQty += num;
        updateCardData('quantity', newQty);
    };

    return (
        <>
            <FormControl
                sx={{ m: 1, width: '30%' }}
                size="small"
            >
                <TextField
                    id="quantity-field"
                    label="Quantity"
                    value={cardData.quantity || 1}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        readOnly: true
                    }}
                />
            </FormControl>
            <Stack spacing={-2} >
                <IconButton onClick={() => changeQty(1)}>
                    <AddIcon />
                </IconButton>
                <IconButton onClick={() => changeQty(-1)}>
                    <RemoveIcon />
                </IconButton>
            </Stack>
        </>
    );
};

QuantitySelectField.FIELD_NAME = 'QuantitySelectField';

export default QuantitySelectField;