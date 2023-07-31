import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    IconButton,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import PriceDisplay from "../_common/PriceDisplay";
import CardForm from "../_common/CardForm/CardForm";

const CollectionCardItem = ({ card, editCard, canEdit, fields, removeCard }) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(!editOpen);
    }

    const borderStyles = card.foil === 'Yes' || card.foil === 'Etched' ? {
        border: '5px solid transparent',
        borderImage: 'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
        borderImageSlice: 1,
    }
        : {
            border: 5,
            borderColor: 'black',
            width: 'auto',
            borderRadius: '10px'
        }
    
    return (
        <Accordion TransitionProps={{ unmountOnExit: true }} sx={{...borderStyles}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${card.name}-content`}
                id={`${card.name}-header`}
            >
                <Grid container spacing={1}>
                    <Grid item xs={10} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{card.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <PriceDisplay card={card}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">Quality: <br/>{card.quality}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">For Trade: {card.for_trade ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">Qty:{card.quantity}</Typography>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ height: '100%' }}>
                <Grid container spacing={4}>
                    {/* IMAGE  CONTAINER*/}
                    <Grid item xs={4}>
                        <img
                            src={card.image_uri}
                            alt={`Full-card ${card.name} ${card.set_name} ${card.collector_number}`}
                            style={{ height: 'auto', width: '100%' }}
                        />
                    </Grid>
                    {/* CARD INFO CONTAINER */}
                    <Grid item container xs={8} spacing={2} sx={{ textAlign: "left" }}>
                        <Grid item xs={8} >
                            <Typography variant="h4">
                                {card.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1">
                                Mana cost: {card.mana_cost}
                            </Typography>
                            <Typography variant="body1">
                                Color Identity: {card.color_identity ? card.color_identity : 'colorless'}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            {/* BUTTON TO OPEN EDIT FORM */}
                            {canEdit && <IconButton onClick={handleEditOpen}>
                                <EditIcon />
                            </IconButton>}
                        </Grid>
                        <Grid item xs={1}>
                            {/* BUTTON TO REMOVE CARD */}
                            {canEdit && <IconButton onClick={()=> removeCard(card.id)}>
                                <ClearIcon />
                            </IconButton>}
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5">
                                {card.type_line}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "left" }} >
                            {card.oracle_text.split('\n').map((line, idx) => <Typography key={`${card.name}-oracle-line-${idx}`} variant="body1">{line}</Typography>)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {card.power}/{card.toughness}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                {card.set_name} - {card.set_code}
                            </Typography>
                            <Typography>
                                Collector # {card.collector_number}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            Illustrated by {card.artist}
                        </Grid>
                        {editOpen && <CardForm card={card} addCard={editCard} handleClose={()=> setEditOpen(false)} fields={fields}/>}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default CollectionCardItem;