import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import Searchbar from './Searchbar'
import CardDetailsBox from './CardDetailsBox';
import CardService from '../../Api/CardService';

/* Returns MUI modal component https://mui.com/material-ui/react-modal/
*
*  Modal contains <Searchbar/> and <CardDetailsBox/>.
*  
*  State:
*   cardName - card name selected with Searchbar.
*   printings - array of selected card printings.
*
*  Props:
*    open - boolean, true means modal is open, false means modal is closed.
            managed by parent component.
*    setSearchOpen - function to change open prop.
*    addCard - function used to add card to relevant memory.
*                State for trade page.
*                db for <CardBinder/> pages.
*    fields - form fields, used in <CardForm/>
*
*  Once the user selects a card name with Searchbar,
*  this component calls to API to get all printings of card.
*
*  When we have the printings, we pass them into CardDetailsBox,
*
*  On close, we clear printings and selected card, allowing 
*  the user to start a new search. 
*  
*  Tradeoff is that if a user accidentally closes modal, they
*  will lose all data from the search and form.
*/

const AddCardModal = ({ open, addCard, setSearchOpen, fields }) => {

    const [cardName, setCardName] = useState();
    const [printings, setPrintings] = useState([]);

    useEffect(() => {
        if (cardName && cardName.id) {
            // get matching card printings from database
            CardService.getCardsByOracleId(cardName.id)
                .then((options) => {
                    // set selected options to returned cards
                    setPrintings(() => [...options]);
                });
        };
        // run on component unmount
        return () => {
            setCardName('');
            setPrintings([]);
        };
    }, [cardName]);

    const handleClose = () => {
        setPrintings([]);
        setSearchOpen(false);
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
                        marginTop: '6vh',
                        height: '88vh',
                        position: 'relative',
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        <Typography variant='h2' sx={{ m: 2 }}>
                            Card Search
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClose}
                            color='error'
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
                        setCardName={setCardName}
                        cardName={cardName}
                    />
                    {printings.length > 0
                        && <CardDetailsBox
                            printings={printings}
                            addCard={addCard}
                            handleClose={handleClose}
                            fields={fields}
                        />
                    }
                </Paper>
            </Container>
        </Modal>
    )
};

export default AddCardModal;