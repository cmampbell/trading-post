import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SetSelectField = ({ printings, card, setCard, updateCardData }) => {

    const handleChange = (evt) => {
        const { value } = (evt.target);
        const [setName, collectorNumber] = value.split('-');
        const newCard = printings.find((print) => print.set_name === setName && print.collector_number === collectorNumber);
        setCard(()=> newCard);
        const foilValue = newCard.usd_price ? 'No' : newCard.usd_foil_price ? 'Yes' : 'Etched'
        updateCardData('foil', foilValue )
    }

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
    )
}

export default SetSelectField;