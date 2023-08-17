import React from "react";
import Typography from "@mui/material/Typography";

/* Reusable component to calculate price of a card object, or an array of card objects.
*
*  We calculate the card price by checking if the card itself has a foil value, which
*  could occur when using this component in <CollectionCardItem/> or <CardItem/>.
*  Otherwise we check if the formData has foil information, which is used in <CardForm/>
*  inputs.
*
*  If this component is passed an array of cards, we can calculate the total price of the
*  cards and use that value instead. This component should only ever be passed a card or cards
*
*  Returns an MUI Typography element containing the price of the card object,
*  or the total price of the cards in the array.
*/

const PriceDisplay = ({ card = null, cards = null, formData = {}, sx = {} }) => {

    const calcCardPrice = (card) => {
        let price;

        if (card.foil) {
            price = card.foil === "Yes" ? card.usd_foil_price
                : card.foil === "Etched" ? card.usd_etched_price
                    : card.usd_price;
        } else if (formData.foil) {
            price = formData.foil === "Yes" ? card.usd_foil_price
                : formData.foil === "Etched" ? card.usd_etched_price
                    : card.usd_price;
        }
        // if card has quantity use that, or just use 1
        return (+price * (formData.quantity || card.quantity || 1)).toFixed(2);
    };

    const calcTotalPrice = () => {
        const priceSum = cards.reduce((sum, card) => sum + (+calcCardPrice(card)), 0);
        return priceSum.toFixed(2);
    };

    return (
        <Typography variant='body1' sx={sx}>
            {card && `$${calcCardPrice(card)}`}
            {cards && `$${calcTotalPrice(cards)}`}
        </Typography>
    );
};

export default PriceDisplay;