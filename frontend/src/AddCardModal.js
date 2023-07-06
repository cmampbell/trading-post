import React, { useState, useEffect } from 'react';
import { Modal, Container, Paper } from "@mui/material";
import Searchbar from './Searchbar'
import Api from './Api';

const AddCardModal = ({ open, onClose }) => {
    // useContext to get API call from tradePage?
    // pass in function to Searchbar
    // Searchbar would need to pass up the input it has

    // use returned results to populate the options

    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cardOptions, setCardOptions ] = useState([]) 

    useEffect(()=> {
        // stops from running on an empty string
        let timerID;
        if(searchInput){
            timerID = setTimeout(async ()=> {
                console.log(searchInput);
                setIsLoading(()=> true)
                const cards = await Api.getCardsByName(searchInput)
                // make API call
                // set cardOptions equal to the response
                // setIsloading to false
            }, 500);
        }
        return () => clearTimeout(timerID)
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
                    {cardOptions.length > 0 }  
                    {/* && cardOptions.map((card)=> <Card/>) */}
                </Paper>
            </Container>
        </Modal >
    )
}

export default AddCardModal;