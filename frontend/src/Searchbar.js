import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

const Searchbar = ({ searchInput, setSearchInput, cards, setSelectedCard, selectedCard, isLoading }) => {
    const handleInputChange = (evt, newValue) => {
        setSearchInput(()=> newValue)
    }

    const handleValueChange = (evt, newValue) => {
        setSelectedCard(()=> newValue)
    }

    useEffect(()=> {
        return () => {
            setSearchInput('')
        setSelectedCard(()=> '')
        }
    }, [])

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
            clearOnBlur
            clearOnEscape
            autoSelect
            loading={isLoading}
            loadingText='Loading...'
            noOptionsText='No options found.'
            options={cards.map((card) => ({id: card.oracle_id, label: card.name}))}
            renderInput={(params) => <TextField {...params} label="Card Name" />}
            sx={{width: '90%'}}
        />
        </>
    )
}

export default Searchbar;