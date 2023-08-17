import React, { useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddCardModal from "../_common/AddCardModal/AddCardModal";
import CollectionCardItem from "./CollectionCardItem";
import PriceDisplay from "../_common/PriceDisplay";

/* 
*  Returns MUI container component with title, addCard button, and list of cards.
*  This component can be used to display any collection of cards, display the total number
*  and display the total price of all cards in the list.
*
*  useLoaderData is used to get a users collection, for trade list, or want list, before
*  the component is mounted. We store the result in listCards as state.
*
*  useParams is used to get userId from url parameter. We use this to check if the current
*  user is the same user that the binder belongs to, which enables adding, editing, and removing
*  cards.
*
*  useOutletContext is used to get currUser from <App/> Outlet Context. Used with useParams 
*  for reason above.
*
*  state: 
*       listCards - array of card objects in a users collection. initially fetched from the
*                   backend by the API.
*       searchOpen - boolean used to open and close <AddCardModal/>
*       isOwner - boolean, mostly for readability, to track whether the current user owns the binder
*
*  props:
*       binderType - string used to track what kind of binder we should render. Options should
*                    only be 'collection', 'trade', or 'want list'.
*       service - related to binder type, this is the API service we want to use for the binder.
*                 These are found in '../Api', and fed into the <CardBinder/> from routes.js. It
*                 contains the methods to add, update, and remove cards, and an array of fields
*                 to use in <CardForm/>
*
*  Inside addCardToBinder, editCardInBinder, and removeCardFromBinder, we update the data in state,
*  and on the backend. The backend is our source of truth, but because we get that data from the
*  routes loader function, we only get data from the backend when the component is first mounted.
*  Therefore to have dynamic updating on the component, we need to update the data in state as well.
* 
*  To-Do: add flash messages to confirm changes to collection
*/

const CardBinder = ({ binderType, service }) => {
    const { cards, owner } = useLoaderData();
    const { userId } = useParams();
    const { currUser } = useOutletContext();

    const [listCards, setListCards] = useState(cards);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(currUser.id === +userId);

    const { addCard, editCard, removeCard, addFields, editFields } = service;

    const handleSearchOpen = () => {
        setSearchOpen(true);
    };

    const addCardToBinder = async (card, cardData) => {
        try {
            const cardToAdd = { cardID: card.id, ...cardData };
            await addCard(currUser.id, cardToAdd);
            setListCards((oldListCards) => [...oldListCards, { ...card, ...cardData }]);
        } catch (err) {
            console.log(err);
        };
    };

    const editCardInBinder = async (cardToUpdate, editData) => {
        try {
            const card = await editCard(currUser.id, cardToUpdate.id, editData);
            setListCards((oldListCards) => oldListCards.map(
                oldCard => oldCard.id === card.card_id
                    ? { ...oldCard, ...card } : oldCard));
        } catch (err) {
            console.log(err);
        };
    };

    const removeCardFromBinder = async (cardId) => {
        try {
            await removeCard(currUser.id, cardId);
            setListCards((oldListCards) => oldListCards.filter(card => card.id !== cardId));
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Container>
            <Typography variant="h2" sx={{ m: 1, fontWeight: 'bold' }}>{owner}'s {binderType}</Typography>
            <Typography variant="subtitle1">Total Cards: {listCards.reduce((total, card) => total + card.quantity, 0)}</Typography>
            <PriceDisplay cards={listCards} />
            {(isOwner) &&
                binderType !== "trade" &&
                <Button
                    onClick={handleSearchOpen}
                    variant="contained"
                    sx={{ m: 2 }}
                >Add card to collection
                </Button>
            }
            {isOwner && <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addCardToBinder} fields={addFields} />}
            {listCards && listCards.map((card, idx) => {
                return <CollectionCardItem card={card} key={`${card.id}+${idx}`} removeCard={removeCardFromBinder} editCard={editCardInBinder} canEdit={(isOwner)} pageType={binderType} fields={editFields} />;
            })}
            <Typography variant="subtitle2"> Art and card images &#8482; & &copy; Wizards Of The Coast, Inc.</Typography>
        </Container>
    )
};

export default CardBinder;