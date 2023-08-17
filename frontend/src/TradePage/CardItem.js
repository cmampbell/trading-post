import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import PriceDisplay from '../_common/PriceDisplay';

/* Component used to display card info on the trade page.
*
*  Props:
*       card - the card to display
*       deleteCard - function to remove the card from trade page state
*/

const CardItem = ({ card, deleteCard }) => {
    const {
        name,
        set_code: setCode,
        collector_number: collectorNumber,
        foil,
        quantity,
        id: cardId
    } = card;

    const deleteSelf = () => {
        deleteCard(cardId)
    }

    return (
        <Card sx={
            foil === 'Yes' ? {
                border: '2px solid transparent',
                borderImage: 'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
                borderImageSlice: 1,
            }
                : {
                    border: 2,
                    borderColor: 'black',
                    width: 'auto',
                }}>
            <Grid container spacing={0} sx={{ width: '95%' }}>
                <Grid item xs={8}>
                    <Typography variant='body1' sx={{ textAlign: 'left', fontWeight: 'bold', paddingLeft: '3vw' }}> {name} </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant='body1'>
                        Qty: {quantity}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={deleteSelf} className={name} color='error' sx={{ top: '-13%' }} >
                        <CloseIcon />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='body2' sx={{ textAlign: 'left', paddingLeft: '3vw' }}>
                        {setCode.toUpperCase()} - #{collectorNumber}
                    </Typography>
                </Grid>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={4}>
                    <PriceDisplay card={card} sx={{ textAlign: 'left', paddingLeft: '4.5vw' }} />
                </Grid>
            </Grid>
        </Card >
    )
}

export default CardItem;