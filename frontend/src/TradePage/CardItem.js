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

    return (
        // TO-DO: have outline change depending on foil status
        <Card >
            <Grid container spacing={10}>
                <Grid item xs={2}>
                    <CardMedia
                        component='img'
                        image={artURI}
                        alt={`${name} art illustrated by ${artist}`}
                        sx={{ width: '10vh' }}
                    />
                </Grid>
                <Grid item xs={10} container>
                    <Grid item xs container direction="row" spacing={2} sx={{ textAlign: 'left' }}>
                        <Grid item xs={8}>
                            <Typography variant='h6' component={'p'}> {name} </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component={'p'} variant='body2'>
                                {setCode.toUpperCase()} - # {collectorNumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={deleteSelf} className={name}>
                                <CloseIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component={'p'} variant='body2'>
                                {quality}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component={'p'} variant='body2'>
                                Foil: {foil}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component={'p'} variant='body2'>
                                Qty: {quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <PriceDisplay card={card}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card >
    )
}

export default CardItem;