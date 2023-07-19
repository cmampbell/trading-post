import React from 'react';
import { Card, Typography, CardMedia, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CardItem = ({ card, deleteCard }) => {
    const {
        name,
        set_code: setCode,
        price,
        art_uri: artURI,
        artist,
        collector_number: collectorNumber,
        condition,
        foil,
        quantity,
        card_id: cardId
    } = card;

    const deleteSelf = () => {
        deleteCard(cardId)
    }

    return (
        // TO-DO: have outline change depending on foil status
        <Card variant="outlined">
            <Grid container spacing={10}>
                <Grid item xs={2}>
                    <CardMedia
                        component='img'
                        image={artURI}
                        alt={`${name} art illustrated by ${artist}`}
                        sx={{ width: '10vh' }}
                    />
                </Grid>
                <Grid item xs={9} container>
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
                        <Grid item xs={4}>
                            <Typography component={'p'} variant='body2'>
                                {condition}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component={'p'} variant='body2'>
                                Foil: {foil}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component={'p'} variant='body2'>
                                Qty: {quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component={'p'} variant='body2'>
                                {`$${(+price * quantity).toFixed(2)}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card >
    )
}

export default CardItem;