import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid  from "@mui/material/Grid";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CardService from "../../Api/CardService"
import WebcamCardReader from "./WebcamCardReader";

/* MUI autocomplete component https://mui.com/material-ui/react-autocomplete/
*  Returns <Grid/> containing MUI <Autocomplete /> and <IconButton/> to open camera search modal
*
*  Two actions users can take to find cards:
*        1) Text Search
*               -  User begins typing card name, 
*                half a second after last input change, 
*                API call is made to find card name options
*               -  Matching card names autofill a dropdown menu, 
*                  user selects the card name they wanted
*               -  update cardName from <AddCardModal/> with user selection
*               -  Searchbar cleared
*
*        2) Photo Search
*               - User can click camera icon to open <WebcamCardReader />
*               - See <WebcamCardReader /> for explanation
*               - After WebcamCardReader selects a card, cardName is updated
*                 in <AddCardModal/>
*
*  State: 
*       searchInput - user input into searchbar, we control it in state
*       cardOptions - select options returned from API based on the user input
*                     fed into autocomplete
*       isLoading - boolean used to indicate if browser is waiting for response
*                   from API for card options
*       cameraOpen - boolean used to control camera modal open state
*                    true means camera modal is open, false means closed
*       
*  Props:
*       setCardName - function to update cardName in AddCardModal
*       cardName - passed in from <AddCardModal/>, tracks the card selected by the user
*                   and used to request all printings of the card name from the API
*/

const Searchbar = ({ setCardName, cardName }) => {
    const [searchInput, setSearchInput] = useState('');
    const [cardOptions, setCardOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);

    useEffect(() => {
        let timerID;
        if (searchInput && !cardName) {
            setIsLoading(true);
            timerID = setTimeout(async () => {
                try {
                    const cards = await CardService.getCardsByName(searchInput);
                    setCardOptions(() => [...cards]);
                    setIsLoading(() => false);
                } catch (err) {
                    console.log(err);
                }
            }, 500);
        }
        // useEffect cleanup function
        return () => {
            // clear ID if search input changes bc user is typing
            clearTimeout(timerID);
            // Set cards to empty array to clear old results
            setCardOptions(() => []);
        }
    }, [searchInput, cardName]);

    const handleInputChange = (evt, newValue) => {
        // controlled autocomplete
        setSearchInput(() => newValue);
    };

    const handleValueChange = (evt, newValue) => {
        // value changes when user makes a selection
        if (newValue) setCardName(() => newValue);
    };

    const openCameraModal = () => {
        setCameraOpen(() => true);
    };

    const closeCameraModal = () => {
        setCameraOpen(() => false);
    };

    const getCardWithCamera = async (cardNameGuess) => {
        console.log(cardNameGuess);
        if (cardNameGuess) setSearchInput(() => cardNameGuess);
        try {
            const card = await CardService.getCardsByName(cardNameGuess);
            setCardName(() => ({ name: card[0].name, id: card[0].oracle_id }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Grid container sx={{width: '100%'}}>
                <Grid item xs={10}>
                    <Autocomplete
                        inputValue={searchInput}
                        onInputChange={handleInputChange}
                        value={cardName}
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
                        filterOptions={x => x}
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
                </Box>
            </Modal>
        </>
    );
};

export default Searchbar;