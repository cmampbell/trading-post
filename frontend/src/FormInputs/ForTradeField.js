import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const ForTradeField = ({cardData, updateCardData}) => {

    const handleCheck = (evt) => {
        updateCardData('forTrade', evt.target.checked);
    }

    return (
            <FormControlLabel
                labelPlacement="end"
                value="end"
                label="For Trade"
                control={<Checkbox
                    checked={cardData.forTrade}
                    onChange={handleCheck}
                    inputProps={{ 'aria-label': 'controlled' }} />} />
    )
}

export default ForTradeField;