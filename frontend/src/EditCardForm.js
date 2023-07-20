import React, { useState } from "react";
import {
    Grid,
    IconButton,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormGroup,
    TextField,
    Stack,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const EditCardForm = ({ card, editCardInCollection, setEditOpen }) => {
    const INITIAL_STATE = { quantity: card.quantity, condition: card.quality, forTrade: card.for_trade };

    const [editData, setEditData] = useState(INITIAL_STATE);

    const handleChange = (evt) => {
        const { name, value } = (evt.target);
        setEditData(editData => ({...editData, [name]: value}))
    }

    const handleCheck = (evt) => {
        setEditData(oldEditData => ({...oldEditData, forTrade: evt.target.checked}))
    }
    
    const changeQty = (num) => {
        if (editData.quantity + num < 0) return
        let newQty = editData.quantity;

        newQty += num;

        setEditData((oldEditData) => {
            return ({ ...oldEditData, quantity: newQty })
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        editCardInCollection(card, editData);
        setEditOpen(false);
    }

    const handleCancel = () => {
        setEditData(INITIAL_STATE);
    }

    return (
        <FormGroup>
            <Grid container spacing={1}>
                {/* edit qty, quality, for trade */}
                <Grid item xs={2}>
                    <FormControlLabel
                        labelPlacement="end"
                        value="end"
                        label="For Trade"
                        control={<Checkbox
                                    checked={editData.forTrade}
                                    onChange={handleCheck}
                                    inputProps={{'aria-label': 'controlled'}}/>} />
                </Grid>
                <Grid container item xs={3} spacing={2}>
                    <Grid item xs={9}>
                        <FormControl
                            size="small"
                        >
                            <TextField
                                id="quantity-field"
                                label="Quantity"
                                value={editData.quantity}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack spacing={-2}>
                            <IconButton
                                onClick={() => changeQty(1)}
                            >
                                <AddIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => changeQty(-1)}
                            >
                                <RemoveIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" sx={{ width: '100%' }}>
                        <InputLabel id="condition-select-label">Condition</InputLabel>
                        <Select
                            labelId="condition-select-label"
                            id="condition-select"
                            value={editData.condition}
                            label="condition"
                            onChange={handleChange}
                            name="condition"
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
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </FormGroup>
    )
}

export default EditCardForm;