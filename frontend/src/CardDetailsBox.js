import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, TextField } from "@mui/material";

// TODO: Add quantity form field
const CardDetailsBox = ({ cards, setListCards, handleClose }) => {
    // rendered after user selects a card
    const INITIAL_STATE = { card: cards[0], condition: 'Lightly Played', foil: 'No', quantity: 1 }
    // form control
    const [cardDetails, setCardDetails] = useState(INITIAL_STATE)

    // update state based on input changes
    const handleChange = (evt) => {
        const { name, value } = (evt.target)
        if (name === 'set') {
            const [setName, collector_number] = evt.target.value.split('-');
            const newCard = cards.find((card) => card.set_name === setName && card.collector_number === collector_number)
            setCardDetails(() => ({ ...cardDetails, card: { ...newCard } }))
        } else {
            setCardDetails(() => ({ ...cardDetails, [name]: value }))
        }
    }

    // add card object to list on click
    const handleClick = (evt) => {
        evt.preventDefault();
        const {card, condition, foil} = cardDetails;
        setListCards((currentCardList)=> [...currentCardList, {condition, foil, ...card}])
        setCardDetails(()=> {})
        handleClose();
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
            height: '100%',
            m: 2
        }}>
            {/* container for image */}
            <Box sx={{
                height: '30%',
                overflow: 'hidden',
            }}>
                <img
                    src={cardDetails.card.art_uri}
                    alt={`${cardDetails.card.name} image`}
                    style={{ width: 'auto', height: '100%' }}
                />
            </Box>

            <h3>{cardDetails.card.name}</h3>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignContent: 'flex-start',
                width: '80%',
                height: 'auto'
            }}>
                <FormControl
                    sx={{ m: 1, width: '90%' }}
                    size="small"
                >
                    <InputLabel id="set-select-label">Set</InputLabel>
                    <Select
                        labelId="set-select-label"
                        id="set-select"
                        value={`${cardDetails.card.set_name}-${cardDetails.card.collector_number}`}
                        label="set"
                        name="set"
                        onChange={handleChange}
                    >
                        {/* render menu items for each version of the card found */}
                        {cards.map((card) =>
                            <MenuItem
                                value={`${card.set_name}-${card.collector_number}`}
                                key={`${card.set_code}-${card.collector_number}`}
                            >{card.set_name} - #{card.collector_number}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{ m: 1, width: '90%' }}
                    size="small"
                >
                    <InputLabel id="condition-select-label">Condition</InputLabel>
                    <Select
                        labelId="condition-select-label"
                        id="condition-select"
                        value={cardDetails.condition}
                        label="condition"
                        onChange={handleChange}
                        name="condition"
                    >
                        {/* using condition list from tcgplayer.com */}
                        <MenuItem value="Near Mint" key="mint">Near Mint</MenuItem>
                        <MenuItem value="Lightly Played" key="lightly-played">Lightly Played</MenuItem>
                        <MenuItem value="Moderately Played" key="moderately-played">Moderately Played</MenuItem>
                        <MenuItem value="Heavily Played" key="heavily-played">Heavily Played</MenuItem>
                        <MenuItem value="Damaged" key="damaged">Damaged</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{ m: 1, width: '90%' }}
                    size="small"
                >
                    <InputLabel id="foil-select-label">Foil</InputLabel>
                    <Select
                        labelId="foil-select-label"
                        id="foil-select"
                        value={cardDetails.foil}
                        label="foil"
                        name="foil"
                        onChange={handleChange}
                    >
                        {/* certain cards only have certain prices, only render the ones they have */}
                        {cardDetails.card.usd_price && <MenuItem value="No" key="no">No</MenuItem>}
                        {cardDetails.card.usd_foil_price && <MenuItem value="Yes" key="yes">Yes</MenuItem>}
                        {cardDetails.card.usd_etched_price && <MenuItem value="Etched" key="etched">Etched</MenuItem>}
                    </Select>
                </FormControl>
                {/* TO-DO: add quantity */}
                {/* <FormControl
                    sx={{ m: 1, width: '90%' }}
                    size="small"
                >
                    <InputLabel id="quantity-select-label">Foil</InputLabel>
                    <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </FormControl> */}
            </Box>
            <Typography sx={{ m: 1 }}>
                {/* depending on the foil selection, render relevant price */}
                ${cardDetails.foil === "Yes" ? cardDetails.card.usd_foil_price
                    : cardDetails.foil === "Etched" ? cardDetails.card.usd_etched_price
                        : cardDetails.card.usd_price}
            </Typography>
            <Button onClick={handleClick}> Add Card! </Button>
        </Box>
    )
}

export default CardDetailsBox;