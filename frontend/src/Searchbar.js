import React, { useState } from "react";
import { TextField } from "@mui/material";

const Searchbar = ({ searchInput, setSearchInput }) => {
    const handleChange = (evt) => {
        setSearchInput(()=> evt.target.value)
    }

    return (
        <TextField 
            id="standard-controlled"
            label="Card Name"
            variant="standard"
            value={searchInput}
            onChange={handleChange}/>
    )
}

export default Searchbar;