import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CardList from './CardList';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PriceDisplay from '../_common/PriceDisplay';

/* Returns a MUI Container with Tabs for each Card List
*
*  Uses code from here for Tab functionality: https://mui.com/material-ui/react-tabs/
*
*  State: value - the index prop of the current tab that is open
*
*         cardLists - an object containing keys of tab indexes, with values
*                     of card arrays. We track the state of each list here.
*
*/

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: 'divider' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `card-list-tab-${index}`,
        'aria-controls': `card-list-tabpanel-${index}`,
    };
}

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#01589b',
    },
});

export default function CardListDisplay() {
    const [value, setValue] = useState(0);
    const [cardLists, setCardLists] = useState({ 0: [], 1: [] })

    const addToCardLists = (card, cardData) => {
        setCardLists((oldCardLists) => ({ ...oldCardLists, [value]: [...oldCardLists[value], {...card, ...cardData}] }))
    }

    const removeFromCardLists = (cardId) => {
        setCardLists((oldCardLists) => ({ ...oldCardLists, [value]: oldCardLists[value].filter((card) => card.id !== cardId) }));
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ width: '95vw' }}>
            <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="card list tabs"
                variant="fullWidth"
            >
                <Tab
                    label="Card List One"
                    {...a11yProps(0)}
                    sx={{ borderTop: 2, borderRight: 2, borderLeft: 2, borderBottom: value === 0 ? 0 : 2, borderColor: 'divider' }}
                />
                <Tab
                    label="Card List Two"
                    {...a11yProps(1)}
                    sx={{ borderTop: 2, borderRight: 2, borderBottom: value === 1 ? 0 : 2, borderColor: 'divider' }}
                />
            </StyledTabs>
            <CustomTabPanel value={value} index={0}>
                <CardList
                    value={value}
                    addToCardLists={addToCardLists}
                    removeFromCardLists={removeFromCardLists}
                    cards={cardLists[0]}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CardList
                    value={value}
                    addToCardLists={addToCardLists}
                    removeFromCardLists={removeFromCardLists}
                    cards={cardLists[1]}
                />
            </CustomTabPanel>
            <Typography>
                Card List One Price: <PriceDisplay cards={cardLists[0]} />
            </Typography>
            <Typography>
                Card List Two Price: <PriceDisplay cards={cardLists[1]} />
            </Typography>
        </Container>
    );
}