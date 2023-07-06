import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import { Add } from '@mui/icons-material';

const CardSearchResult = ({ card }) => {
    const { name, oracle_id: oracleId } = card;
    const handleClick = (evt) => {
        console.log(oracleId)
    }
    return (
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="add" onClick={handleClick}>
              <Add />
            </IconButton>}>
            <ListItemText primary={name} />
          </ListItem>
    )
}

export default CardSearchResult;