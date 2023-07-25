import React from "react";
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

const QualitySelectField = ({ cardData, updateCardData }) => {

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        updateCardData(name, value);
    }

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
                {/* using condition list from tcgplayer.com
        {/* TODO: Add condition price modifier */}
                <MenuItem value="Near Mint" key="mint">Near Mint</MenuItem>
                <MenuItem value="Lightly Played" key="lightly-played">Lightly Played</MenuItem>
                <MenuItem value="Moderately Played" key="moderately-played">Moderately Played</MenuItem>
                <MenuItem value="Heavily Played" key="heavily-played">Heavily Played</MenuItem>
                <MenuItem value="Damaged" key="damaged">Damaged</MenuItem>
            </Select>
        </FormControl>
    )
}

export default QualitySelectField;