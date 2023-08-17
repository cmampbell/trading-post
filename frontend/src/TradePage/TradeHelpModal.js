import React from 'react';
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

/* Returns MUI modal component https://mui.com/material-ui/react-modal/
*
*  Displays text instructions on how to use the Trade Page.
*
*  Props:
*       open - boolean used to track status of modal.
*       toggleHelpModal - function used to open and close Modal by toggling open boolean
*/

const TradeHelpModal = ({ open, toggleHelpModal }) => {

    const handleClose = () => {
        toggleHelpModal(false)
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
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '8vh',
                        height: 'auto'
                    }}
                >
                    <List>
                        <ListItem>
                            <Typography variant="body1">
                                {`1)`} Click a card list tab make it active
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1">
                                {`2)`} Click the 'Add Card' button to add a card to the list
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1">
                                {`3)`} Using the search bar or camera button, add your cards to each list.
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="body1">
                                {`4)`} When both lists are complete, compare the values at the bottom price and decide whether to make the trade!
                            </Typography>
                        </ListItem>
                    </List>
                </Paper>
            </Container>
        </Modal >
    )
}

export default TradeHelpModal;