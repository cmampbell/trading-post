import React, { useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router";
import { Button, Container, Typography } from "@mui/material";
import AddCardModal from "../_common/AddCardModal/AddCardModal";
import CollectionCardItem from "./CollectionCardItem";
import PriceDisplay from "../_common/PriceDisplay";

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
const CardBinder = ({ binderType, service }) => {
    const cards = useLoaderData();
    const { userId } = useParams();
    const { currUser } = useOutletContext();

    const [listCards, setListCards] = useState(cards);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(currUser.id === +userId);

    const { addCard, editCard, removeCard, addFields, editFields } = service;

    const handleSearchOpen = () => {
        setSearchOpen(true);
    }

    const addCardToBinder = async (card, cardData) => {
        try {
            const cardToAdd = { cardID: card.id, ...cardData };
            await addCard(currUser.id, cardToAdd);
            setListCards((oldListCards) => [...oldListCards, { ...card, ...cardData }]);
        } catch (err) {
            console.log(err);
        }
    }

    const editCardInBinder = async (cardToUpdate, editData) => {
        try {
            const card = await editCard(currUser.id, cardToUpdate.id, editData);
            console.log(card);
            setListCards((oldListCards) => oldListCards.map(
                oldCard => oldCard.id === card.card_id
                    ? { ...oldCard, ...card } : oldCard));
        } catch (err) {
            console.log(err)
        }
    }

    const removeCardFromBinder = async (cardId) => {
        try {
            await removeCard(currUser.id, cardId);
            setListCards((oldListCards) => oldListCards.filter(card => card.id !== cardId));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Typography variant="h2" sx={{m: 1, fontWeight: 'bold'}}>{currUser.username}'s {binderType}</Typography>
            {/* cards num needs to be accumulated from card qty */}
            <Typography variant="subtitle1">Total Cards: {cards.reduce((total, card) => total + card.quantity, 0)}</Typography>
            <PriceDisplay cards={cards}/>
            {(isOwner) &&
                binderType !== "trade" &&
                <Button
                    onClick={handleSearchOpen}
                    variant="contained"
                    sx={{m: 2}}
                >Add card to collection
                </Button>
            }
            {(isOwner) && <AddCardModal open={searchOpen} setSearchOpen={setSearchOpen} addCard={addCardToBinder} fields={addFields} />}
            {listCards && listCards.map((card, idx) => {
                return <CollectionCardItem card={card} key={`${card.id}+${idx}`} removeCard={removeCardFromBinder} editCard={editCardInBinder} canEdit={(isOwner)} pageType={binderType} fields={editFields} />;
            })}

            <Typography variant="subtitle1"> Art and card images &#8482; & &copy; Wizards Of The Coast, Inc.</Typography>
        </Container>
    )
};

export default CardBinder;