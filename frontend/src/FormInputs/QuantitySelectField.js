import React from "react";
import { FormControl, TextField, Stack, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelectField = ({ cardData, updateCardData }) => {

    const changeQty = (num) => {
        if (cardData.quantity + num < 0) return
        let newQty = cardData.quantity;

        newQty += num;

        updateCardData('quantity', newQty);
    }
    return (
        <>
            <FormControl
                sx={{ m: 1, width: '30%' }}
                size="small"
            >
                <TextField
                    id="quantity-field"
                    label="Quantity"
                    value={cardData.quantity}
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
    )
}

export default QuantitySelectField;