import React from 'react';
import { Card, Typography, CardMedia, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PriceDisplay from '../_common/PriceDisplay';

const CardItem = ({ card, deleteCard }) => {
    const {
        name,
        set_code: setCode,
        art_uri: artURI,
        artist,
        collector_number: collectorNumber,
        quality,
        foil,
        quantity,
        id: cardId
    } = card;

    const deleteSelf = () => {
        deleteCard(cardId)
    }


    console.log(card);
    return (
        // TO-DO: have outline change depending on foil status
        // <Card  sx={{border: 'solid', borderColor: foil === 'Yes' ? 'pink' : 'black' , width:'auto'}}>
        <Card sx={
            foil === 'Yes' ? {
                border: '2px solid transparent',
                borderImage: 'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
                borderImageSlice: 1,
                backgroundImage: artURI,
            }
                : { 
                    border: 2,
                    borderColor: foil === 'Yes' ? 'pink' : 'black',
                    width: 'auto',
                    backgroundImage: artURI, }}>
            <Grid container spacing={1} sx={{width: '95%'}}>
                {/* <Grid item xs={2}>
                    <CardMedia
                        component='img'
                        image={artURI}
                        alt={`${name} art illustrated by ${artist}`}
                        sx={{ width: '10vh' }}
                    />
                </Grid> */}
                    <Grid item xs={11}>
                        <Typography variant='body1' sx={{ textAlign: 'left', fontWeight: 'bold' }}> {name} </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={deleteSelf} className={name}>
                            <CloseIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='body2'>
                            {setCode.toUpperCase()} - #{collectorNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='body2'>
                            Qty: {quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <PriceDisplay card={card} />
                    </Grid>
                </Grid>
        </Card >
    )
}

export default CardItem;