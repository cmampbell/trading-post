import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid  from "@mui/material/Grid";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CardService from "../../Api/CardService"
import WebcamCardReader from "./WebcamCardReader";

/* Returns MUI autocomplete component https://mui.com/material-ui/react-autocomplete/
*
* User begins typing, after half a second after last input change, API call is made
*   matching card names autofill a dropdown menu, user can pick
*   selected card state from AddCardModal is set based on user selection
*       Searchbar cleared
*       selected card is populated into CardDetailsBox on AddCardModal
*
* User can also choose to scan card with their camera. The user captures a photo of
* the card, and the Webcam component calls getCardWithCamera, with the tesseract
* result of what it thinks the card name is. We then set the selectedCard for the
* AddCardModal equal to the first entry of the API results.
*
*   The first entry will be the correct card if tesseract was able to extract it,
*   or the first returned card from the name like search.
*
*/
const Searchbar = ({ setSelectedCard, selectedCard }) => {
    const [searchInput, setSearchInput] = useState('');
    const [cardOptions, setCardOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false)

    useEffect(() => {
        let timerID;
        if (searchInput && !selectedCard) {
            setIsLoading(true)
            timerID = setTimeout(async () => {
                try {
                    const cards = await CardService.getCardsByName(searchInput)
                    console.log(cards);
                    setCardOptions(() => [...cards])
                    setIsLoading(() => false)
                } catch (err) {
                    console.log(err)
                }
            }, 500);
        }
        return () => {
            // clear ID if search input changes bc user is typing
            clearTimeout(timerID)
            // Set cards to empty array to clear old results
            setCardOptions(() => [])
        }
    }, [searchInput, selectedCard])

    const handleInputChange = (evt, newValue) => {
        // controlled autocomplete
        setSearchInput(() => newValue)
    }

    const handleValueChange = (evt, newValue) => {
        // value changes when user makes a selection
        if (newValue) setSelectedCard(() => newValue)
    }

    const openCameraModal = () => {
        setCameraOpen(() => true)
    }

    const closeCameraModal = () => {
        setCameraOpen(() => false)
    }

    const getCardWithCamera = async (cardNameGuess) => {
        if (cardNameGuess) setSearchInput(() => cardNameGuess);
        try {
            const card = await CardService.getCardsByName(cardNameGuess);
            setSelectedCard(() => ({ name: card[0].name, id: card[0].oracle_id }))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Grid container sx={{width: '100%'}}>
                <Grid item xs={10}>
                    <Autocomplete
                        inputValue={searchInput}
                        onInputChange={handleInputChange}
                        value={selectedCard}
                        onChange={handleValueChange}
                        id="searchbar"
                        freeSolo
                        selectOnFocus
                        handleHomeEndKeys
                        clearOnEscape
                        autoSelect
                        loading={isLoading}
                        loadingText='Loading...'
                        noOptionsText='No cards found.'
                        options={cardOptions.map((card) => ({ id: card.oracle_id, label: card.name }))}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Card Name"
                        />}
                        sx={{ marginLeft: '5%', width: '90%' }}
                        filterOptions={(x) => x}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={openCameraModal} color="primary" >
                        <PhotoCameraIcon sx={{ fontSize: '35px' }}/>
                    </IconButton>
                </Grid>
            </Grid>

            <Modal
                open={cameraOpen}
                onClose={closeCameraModal}
                aria-labelledby="camera-modal-title"
                aria-describedby="camera-modal"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '8vh',
                        height: '85vh',
                        position: 'relative'

                    }}>
                    <WebcamCardReader
                        setSearchInput={setSearchInput}
                        closeCameraModal={closeCameraModal}
                        getCardWithCamera={getCardWithCamera}
                    />
                    <Button></Button>
                </Box>
            </Modal>
        </>
    )
}

export default Searchbar;