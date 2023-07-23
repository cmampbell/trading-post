import React from "react";
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

const FoilSelectField = ({cardData, updateCardData, card}) => {

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        updateCardData(name, value);
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
                value={cardData.foil}
                label="foil"
                name="foil"
                onChange={handleChange}
            >
                {/* certain cards only have certain prices, only render the ones they have */}
                {card.usd_price && <MenuItem value="No" key="no">No</MenuItem>}
                {card.usd_foil_price && <MenuItem value="Yes" key="yes">Yes</MenuItem>}
                {card.usd_etched_price && <MenuItem value="Etched" key="etched">Etched</MenuItem>}
            </Select>
        </FormControl>
    )
}

export default FoilSelectField;