import React, { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router";
import { Button } from "@mui/material";
import AddCardModal from "./AddCardModal";
import CardItem from "./CardItem";
import TradingPostApi from "./Api";

/*
* This is a mess and needs to be refactored
* It is adding cards to the collection db though
*
* I'm not sure how the handleCardAdd function is working but it is
*
* Need to show cards in list
*/
const CollectionPage = () => {
    const cards = useLoaderData();
    const { currUser } = useOutletContext();

    const [listCards, setListCards] = useState(cards)
    const [searchOpen, setSearchOpen] = useState(false)

    const handleSearchOpen = () => {
        setSearchOpen(true)
    }

    const handleCardAdd = async (currentCardList) => {
        const newCard = currentCardList(listCards)[currentCardList(listCards).length - 1];
        const cardToAdd = { cardID: newCard.id, forTrade: false, quantity: newCard.quantity, quality: newCard.condition, foil: newCard.foil};
        const resp = await TradingPostApi.addCardToCollection(currUser.id, cardToAdd);
        setListCards((oldListCards) => [...oldListCards, newCard]);
    }
    
    const deleteCard = async (cardId) => {
        const resp = await TradingPostApi.removeCardFromCollection(currUser.id, cardId)
        setListCards((oldListCards) => oldListCards.filter(card => card.id != cardId));
    }

    return (
        <>
            <h1>{currUser.username}'s collection</h1>
            <Button onClick={handleSearchOpen} variant="outlined">Add card to collection</Button>
            <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} setListCards={handleCardAdd} />
            {listCards && listCards.map((card, idx) => {
                        card.price = card.foil === 'Etched' ? card.usd_etched_price
                        : card.foil === 'Yes' ? card.usd_foil_price
                            : card.usd_price;
            return <CardItem card={card} key={`${card.id}+${idx}`} deleteCard={deleteCard}/>;})}

        </>
    )
};

export default CollectionPage;