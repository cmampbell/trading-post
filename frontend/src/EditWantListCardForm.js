import React, { useState } from "react";
import {
    Grid,
    IconButton,
    FormControl,
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

const EditWantListCardForm = ({ card, editCard, setEditOpen }) => {
    const INITIAL_STATE = { quantity: card.quantity, foil: card.foil };

    const [editData, setEditData] = useState(INITIAL_STATE);

    const handleChange = (evt) => {
        const { name, value } = (evt.target);
        console.log(name);
        console.log(value);
        setEditData(editData => ({...editData, [name]: value}))
    }

    console.log(editData);
    
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
        editCard(card, editData);
        setEditOpen(false);
    }

    const handleCancel = () => {
        setEditData(INITIAL_STATE);
    }

    return (
        <FormGroup>
            <Grid container spacing={1}>
                {/* edit qty, foil */}
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
                <FormControl
                    sx={{ m: 1, width: '100%' }}
                    size="small"
                >
                    <InputLabel id="foil-select-label">Foil</InputLabel>
                    <Select
                        labelId="foil-select-label"
                        id="foil-select"
                        value={editData.foil}
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
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </FormGroup>
    )
}

export default EditWantListCardForm;