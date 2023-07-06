import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

const Searchbar = ({ searchInput, setSearchInput, cards, setSelectedCard, selectedCard, isLoading }) => {
    const handleInputChange = (evt, newValue) => {
        setSearchInput(()=> newValue)
    }

    const handleValueChange = (evt, newValue) => {
        setSelectedCard(()=> newValue)
    }

    // return (
    //     <TextField 
    //         id="standard-controlled"
    //         label="Card Name"
    //         variant="standard"
    //         value={searchInput}
    //         onChange={handleChange}/>
    // )

    return (
        <>
        <Autocomplete
            inputValue={searchInput}
            onInputChange={handleInputChange}
            value={selectedCard}
            onChange={handleValueChange}
            id="searchbar"
            freeSolo
            selectOnFocus
            handleHomeEndKeys
            options={cards.map((card) => ({id: card.oracle_id, label: card.name}))}
            renderInput={(params) => <TextField {...params} label="Card Name" />}
            sx={{width: '60vw'}}
        />
        </>
    )
}

export default Searchbar;