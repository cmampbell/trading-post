import React, { useState, useEffect } from 'react';
import { Modal, Container, Paper, List } from "@mui/material";
import Searchbar from './Searchbar'
import CardSearchResult from './CardSearchResult';
import Api from './Api';

const AddCardModal = ({ open, onClose }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cardOptions, setCardOptions ] = useState([]) 

    // no call is made if string is empty
    // when a user types into the text input
        // after delay, make call to API for cards
    // user clears textInput
    useEffect(()=> {
        // stops from running on an empty string
        let timerID;
        if(searchInput){
            timerID = setTimeout(async ()=> {
                setIsLoading(()=> true)
                const cards = await Api.getCardsByName(searchInput)
                console.log(cards)
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
                    <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} />
                    {isLoading && <p> Loading...</p>}
                    {cardOptions.length > 0 ? <List> {cardOptions.map((card )=> <CardSearchResult key={card.oracle_id} card={card}/>) }</List>
                                            : <p>No cards found.</p> }  
                    
                </Paper>
            </Container>
        </Modal >
    )
}

export default AddCardModal;