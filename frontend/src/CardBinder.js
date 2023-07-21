import React, { useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router";
import { Button, Container } from "@mui/material";
import AddCardModal from "./AddCardModal";
import TradingPostApi from "./Api";
import CollectionCardItem from "./CollectionCardItem";

/* 
*  Returns MUI container component with title, addCard button, and list of cards
*
*  In the loader function for this component route, we query Api for a users collection,
*  then set listCards state to the response.
*  
*  listCards is where we store the cards that a user has in their collection for the
*  front-end. This should stay up-to-date with the backend database
*
*  searchOpen and handleSearchOpen are used to control whether the AddCardModal is open. The
*  AddCardModal should be open only if a user is searching for cards to add to the collection.
*
*  addCardToCollection will take a card object, and add the card to the users collection in
*  the database, and in state on the front end. deleteCard will remove the card from the users
*  collection in the database, and in state on the front end
*  
*  We are currently returning a list of CardItems, which will need to change to a collection
*  card item
* 
*  To-Do: add flash messages to confirm changes to collection
* 
* This should only care about getting cards and displaying them.
*
* Props: addCard function to add card to Collection/WantList
*        editCard function to edit a card in collection/wantList
         remove card Function to remove a card in collection/wantList
*/
const Binder = ({ pageType }) => {
    const cards = useLoaderData();
    const { userId } = useParams();
    const { currUser } = useOutletContext();

    const [listCards, setListCards] = useState(cards);
    const [searchOpen, setSearchOpen] = useState(false);
    const [canEdit, setCanEdit] = useState((currUser.id === +userId) || false);


    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    const addCardToCollection = async (card) => {
        try {
            const cardToAdd = { cardID: card.id, forTrade: false, quantity: card.quantity, quality: card.condition, foil: card.foil };
            await TradingPostApi.addCardToCollection(currUser.id, cardToAdd);
            setListCards((oldListCards) => [...oldListCards, card]);
        } catch (err) {
            console.log(err);
        }
    }

    const editCard = async (cardToUpdate, editData) => {
        try {
            const card = await TradingPostApi.editCardInCollection(currUser.id, cardToUpdate.id, editData);
            setListCards((oldListCards) => oldListCards.map(
                oldCard => oldCard.id === card.card_id
                    ? { ...oldCard, ...card } : oldCard));
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCard = async (cardId) => {
        try {
            await TradingPostApi.removeCardFromCollection(currUser.id, cardId);
            setListCards((oldListCards) => oldListCards.filter(card => card.id !== cardId));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <h1>{currUser.username}'s {pageType}</h1>
            {canEdit && pageType !== "trade list" && <Button onClick={handleSearchOpen} variant="outlined">Add card to collection</Button>}
            {canEdit && <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addCardToCollection} />}
            {listCards && listCards.map((card, idx) => {
                card.price = card.foil === 'Etched' ? card.usd_etched_price
                    : card.foil === 'Yes' ? card.usd_foil_price
                        : card.usd_price;
                return <CollectionCardItem card={card} key={`${card.id}+${idx}`} deleteCard={deleteCard} editCard={editCard} canEdit={canEdit} pageType={pageType} />;
            })}
        </Container>
    )
};

export default Binder;