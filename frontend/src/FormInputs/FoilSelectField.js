import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Menu, } from "@mui/material";

const FoilSelectField = ({ cardData, updateCardData, card }) => {

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        updateCardData(name, value);
    }

    const checkFoilOptions = (card) => card.usd_price || card.usd_foil_price || card.usd_etched_price ? true : false

    const getFoilOptions = (card) => {
        const options = [];
        if (card.usd_price) options.push('No');
        if (card.usd_foil_price) options.push('Yes')
        if (card.usd_etched_price) options.push('Etched')

        return options
    }

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
                        key={option}>
                        {option}
                    </MenuItem>)}
                {!checkFoilOptions && <MenuItem value='' key=''></MenuItem>}
            </Select>
        </FormControl>
    )
}

export default FoilSelectField;