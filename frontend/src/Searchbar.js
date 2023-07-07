import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import Api from './Api'

/* Returns MUI autocomplete component https://mui.com/material-ui/react-autocomplete/
*
* User begins typing, after half a second after last input change, API call is made
*   matching card names autofill a dropdown menu, user can pick
*   selected card state from AddCardModal is set based on user selection
*       Searchbar cleared
*       selected card is populated into CardDetailsBox on AddCardModal
*/
const Searchbar = ({ setSelectedCard, selectedCard }) => {
    const [searchInput, setSearchInput] = useState('');
    const [cardOptions, setCardOptions] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timerID;
        if (searchInput && !selectedCard) {
            setIsLoading(true)
            timerID = setTimeout(async () => {
                try{
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
        console.log(newValue)
        setSelectedCard(() => newValue)
    }

    return (
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
    )
}

export default Searchbar;