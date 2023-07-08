import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Button, Modal, Box } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Api from './Api'
import WebcamCardReader from "./WebcamCardReader";

/* Returns MUI autocomplete component https://mui.com/material-ui/react-autocomplete/
*
* User begins typing, after half a second after last input change, API call is made
*   matching card names autofill a dropdown menu, user can pick
*   selected card state from AddCardModal is set based on user selection
*       Searchbar cleared
*       selected card is populated into CardDetailsBox on AddCardModal
*/
const Searchbar = ({ setSelectedCard, selectedCard }) => {
    const [searchInput, setSearchInput] = useState();
    const [cardOptions, setCardOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false)

    useEffect(() => {
        let timerID;
        if (searchInput && !selectedCard) {
            setIsLoading(true)
            timerID = setTimeout(async () => {
                try {
                    const cards = await Api.getCardsByName(searchInput)
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
    }, [searchInput])

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
        try {
            const card = await Api.getCardsByName(cardNameGuess);
            console.log(card)
            setSelectedCard(()=> card[0].oracle_id)
        } catch (err){
            console.error(err)
        }
    }

    // add button to do camera scan here
    // we can pass the name into searchInput and then the code remains the same
    // after we get a string, we can then close the camera screen and show the result
    // pull the first card returned from the API call
    return (
        <>
            <Autocomplete
                inputValue={searchInput}
                onInputChange={handleInputChange}
                value={selectedCard}
                onChange={handleValueChange}
                id="searchbar"
                freeSolo
                selectOnFocus
                handleHomeEndKeys
                clearOnBlur
                clearOnEscape
                autoSelect
                loading={isLoading}
                loadingText='Loading...'
                noOptionsText='No options found.'
                options={cardOptions.map((card) => ({ id: card.oracle_id, label: card.name }))}
                renderInput={(params) => <TextField {...params} label="Card Name" />}
                sx={{ width: '90%' }}
            />
            <Button onClick={openCameraModal}>
                <PhotoCameraIcon />
            </Button>
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
                        height: '85vh' 
                    }}>
                    <WebcamCardReader
                        setSearchInput={setSearchInput}
                        closeCameraModal={closeCameraModal}
                        getCardWithCamera={getCardWithCamera}
                    />
                </Box>

            </Modal>
        </>
    )
}

export default Searchbar;