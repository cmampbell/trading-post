import React from "react";
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

/* Input field meant for use with <CardForm/>
*
*  Props:
*       cardData - piece of State from <CardForm/>, used to control input with state
*       updateCardData - function to update cardData in state based on user input
*
*  Simple select menu that allows users to choose card quality for the current card.
*
*  We set FIELD_NAME property on the function for use with useField.js
*/

const QualitySelectField = ({ cardData, updateCardData }) => {

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        updateCardData(name, value);
    };

    return (
        <FormControl
            sx={{ m: 1, width: '100%' }}
            size="small"
        >
            <InputLabel id="quality-select-label">Condition</InputLabel>
            <Select
                labelId="quality-select-label"
                id="quality-select"
                value={cardData.quality || 'Lightly Played'}
                label="quality"
                onChange={handleChange}
                name="quality"
            >
                {/* using condition list from tcgplayer.com */}
                <MenuItem value="Near Mint" key="mint">Near Mint</MenuItem>
                <MenuItem value="Lightly Played" key="lightly-played">Lightly Played</MenuItem>
                <MenuItem value="Moderately Played" key="moderately-played">Moderately Played</MenuItem>
                <MenuItem value="Heavily Played" key="heavily-played">Heavily Played</MenuItem>
                <MenuItem value="Damaged" key="damaged">Damaged</MenuItem>
            </Select>
        </FormControl>
    );
};

QualitySelectField.FIELD_NAME = 'QualitySelectField';

export default QualitySelectField;