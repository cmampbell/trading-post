import React from 'react';
import { Modal, Container, Paper, Typography, List, ListItem } from "@mui/material";

/* Returns MUI modal component https://mui.com/material-ui/react-modal/
*
*  Displays text instructions on how to use the Trade Page.
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
                                    {`1)`} Click a list to make it active
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    {`2)`} Click the 'Add Card' button to add a card to the active list
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    {`3)`} Using the search bar or camera button, add your cards to each list.
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="body1">
                                    {`4)`} After all cards are added to each list, look at the price and decide whether to commit the trade!
                                </Typography>
                            </ListItem>
                        </List>
                </Paper>
            </Container>
        </Modal >
    )
}

export default TradeHelpModal;