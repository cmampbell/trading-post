import React, { useState, useEffect } from 'react';
import { Modal, Container, Paper, Button, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Searchbar from './Searchbar'
import CardDetailsBox from './CardDetailsBox';
import Api from './Api';

/* Returns MUI modal component https://mui.com/material-ui/react-modal/
*
*  Contains Searchbar component and CardDetailsBox component
*  
*  This tracks the selected card returned from Searchbar
*
*  Once the user makes a selection with Searchbar,
*  this makes a call to API to get all printings of card
*
*  Once we have the printings, we display the CardDetailsBox using
*  the card objects returned from the API to autofill the inputs
*
*  On close, we clear everything from state, allowing the user to
*  start a new search. Tradeoff is that user will lose all data
*  if they click out of the modal accidentally
*
*/

const AddCardModal = ({ open, setListCards, setSearchOpen }) => {

    const [selectedCard, setSelectedCard] = useState('')
    const [printings, setPrintings] = useState([])

    useEffect(() => {
        if (selectedCard && selectedCard.id) {
            // get matching card printings from database
            Api.getCardsByOracleId(selectedCard.id)
                .then((options) => {
                    // set selected options to returned cards
                    setPrintings(() => [...options])
                })
        }
        return () => {
            setSelectedCard('')
            setPrintings([])
        }
    }, [selectedCard])

    const handleClose = () => {
        setPrintings([]);
        setSearchOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                        marginTop: '8vh',
                        height: '85vh'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            position: 'relative'
                        }}>
                        <h2 id='modal-title'>Search By Card Name</h2>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '25%',
                                right: '3.5%'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Searchbar
                        setSelectedCard={setSelectedCard}
                        selectedCard={selectedCard}
                    />
                    {printings.length > 0
                        && <CardDetailsBox
                            cards={printings}
                            setListCards={setListCards}
                            handleClose={handleClose}
                        />}
                </Paper>
            </Container>
        </Modal >
    )
}

export default AddCardModal;