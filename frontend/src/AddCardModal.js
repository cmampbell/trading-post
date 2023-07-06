import React, { useState, useEffect } from 'react';
import { Modal, Container, Paper } from "@mui/material";
import Searchbar from './Searchbar'
import CardDetailsBox from './CardDetailsBox';
import Api from './Api';

const AddCardModal = ({ open, onClose }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cardOptions, setCardOptions ] = useState([])
    // when the user selects a card
    // we query API to get selected card
    // and render the card details below the searchbar
        // card details include 
    const [selectedCard, setSelectedCard] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])

    // no call is made if string is empty
    // when a user types into the text input
        // after delay, make call to API for cards
    // user clears textInput
    useEffect(()=> {
        // could move this into search bar
        // stops from running on an empty string
        let timerID;
        if(searchInput && !selectedCard){
            timerID = setTimeout(async ()=> {
                // loading could be done in searchbar
                setIsLoading(true)
                const cards = await Api.getCardsByName(searchInput)
                setCardOptions(()=> [...cards])
                setIsLoading(()=> false)
            }, 500);
        }
        return () => {
            // clear ID if useEffect called again
            clearTimeout(timerID)
            // Set cards to empty array
            setCardOptions(()=> [])
        }
    }, [searchInput])

    useEffect(()=> {
        if(selectedCard){
            retrieveSelectedOptions()
                .then((options) => {
                    setSelectedOptions(()=> [...options])
            })
        }
        return ()=> setSelectedOptions(()=> [])
    }, [selectedCard])

    const retrieveSelectedOptions = async () => {
        const cards = await Api.getCardsByOracleId(selectedCard.id)
        return cards;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Container maxWidth="md">
                <Paper elevation={8}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '3vh',
                        height: '75vh'
                    }}
                >
                    <h1 id='modal-title'> Add Cards </h1>
                    <p id='modal-description'>Search by card name</p>
                    <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} cards={cardOptions} setSelectedCard={setSelectedCard} selectedCard={selectedCard} isLoading={isLoading}/>
                    {isLoading && <p> Loading...</p>}
                    {selectedOptions.length > 0 && <CardDetailsBox cards={selectedOptions}/>}  
                </Paper>
            </Container>
        </Modal >
    )
}

export default AddCardModal;