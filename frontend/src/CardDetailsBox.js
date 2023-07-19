import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, TextField, Stack, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

/* 
*  Returns MUI box component with several input boxes and a button.
*  
*  Only rendered after user has selected a card from the search bar
*
*  User can fill out inputs to enter any details about the card that
*  will affect the price, i.e. set printing, foil status, condition
*
*  Displays the name and artwork from the selected card, so user can see visual
*  confirmation that card art from db matches their physical card. The first card
*  from cards prop will be displayed initially.
*  
*  The Add Cards button will add the current card to the CardList
*  that opened the AddCardModal, clear any state in this component,
*  and close the Modal.
*
*/
const CardDetailsBox = ({ cards, addCard, handleClose }) => {
    const INITIAL_STATE = { card: cards[0], condition: 'Lightly Played', foil: 'No', quantity: 1 };
    cards[0].usd_price ? INITIAL_STATE.foil = 'No'
        : cards[0].usd_foil_price ? INITIAL_STATE.foil = 'Yes'
            : INITIAL_STATE.foil = 'Etched';
    // input control
    const [cardDetails, setCardDetails] = useState(INITIAL_STATE);

    // update state based on input changes
    const handleChange = (evt) => {
        const { name, value } = (evt.target);
        if (name === 'set') {
            const [setName, collectorNumber] = evt.target.value.split('-');
            const newCard = cards.find((card) => card.set_name === setName && card.collector_number === collectorNumber);
            setCardDetails((oldCard) => {
                // check if new card has non-foil, foil, or etched prices
                newCard.usd_price ? oldCard.foil = 'No'
                    : newCard.usd_foil_price ? oldCard.foil = 'Yes'
                        : oldCard.foil = 'Etched';
                return ({ ...oldCard, card: { ...newCard } })
            });
        } else {
            setCardDetails(() => ({ ...cardDetails, [name]: value }));
        }
    }

    // add card object to list on click
    const handleClick = () => {
        const { card, condition, foil, quantity } = cardDetails;
        const price = foil === 'Etched' ? card.usd_etched_price
            : foil === 'Yes' ? card.usd_foil_price
                : card.usd_price;
        addCard({ condition, foil, quantity, price, ...card });
        setCardDetails(() => ({}));
        handleClose();
    }

    const changeQty = (num) => {
        if (cardDetails.quantity + num < 0) return
        let newQty = cardDetails.quantity;

        newQty += num;

        setCardDetails((oldCard) => {
            return ({ ...oldCard, quantity: newQty })
        })
    }

    const calcTotalPrice = price => {
        return (price * cardDetails.quantity).toFixed(2);
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
            {/* TODO: if card is foil add rainbow border to image */}
            <Box sx={{
                height: '30%',
                overflow: 'hidden',
            }}>
                <img
                    src={cardDetails.card.art_uri}
                    alt={`${cardDetails.card.name} art by ${cardDetails.card.artist}`}
                    style={{ width: 'auto', height: '100%' }}
                />

            </Box>
            <p style={{ fontSize: '9px', marginBottom: '-1%' }}>
                Illustrated by {cardDetails.card.artist}. &#8482; & &copy; Wizards Of The Coast, Inc.
            </p>

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
                    sx={{ m: 1, width: '100%' }}
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
                    sx={{ m: 1, width: '100%' }}
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
                {/* using condition list from tcgplayer.com
                {/* TODO: Add condition price modifier */}
                        <MenuItem value="Near Mint" key="mint">Near Mint</MenuItem>
                        <MenuItem value="Lightly Played" key="lightly-played">Lightly Played</MenuItem>
                        <MenuItem value="Moderately Played" key="moderately-played">Moderately Played</MenuItem>
                        <MenuItem value="Heavily Played" key="heavily-played">Heavily Played</MenuItem>
                        <MenuItem value="Damaged" key="damaged">Damaged</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{ m: 1, width: '100%' }}
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
                <FormControl
                    sx={{ m: 1, width: '30%' }}
                    size="small"
                >
                    <TextField
                        id="quantity-field"
                        label="Quantity"
                        value={cardDetails.quantity}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                    />

                </FormControl>
                <Stack
                    spacing={-2}
                    sx={{
                        // display: 'flex',
                        // flexDirection: 'column',
                        // flexWrap: 'nowrap',
                        // alignItems: 'center',
                        // justifyContent: 'flex-start',
                        // alignItems: 'flex-start',
                        // height: '100%'
                    }}>
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

                <Typography sx={{ m: 1 }}>
                    {/* depending on the foil selection, render relevant price */}
                    ${cardDetails.foil === "Yes" ? calcTotalPrice(cardDetails.card.usd_foil_price)
                        : cardDetails.foil === "Etched" ? calcTotalPrice(cardDetails.card.usd_etched_price)
                            : calcTotalPrice(cardDetails.card.usd_price)}
                </Typography>
            </Box>

            <Button onClick={handleClick}> Add Card! </Button>
        </Box>
    )
}

export default CardDetailsBox;