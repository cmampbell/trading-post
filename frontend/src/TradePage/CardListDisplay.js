import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CardList from './CardList';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PriceDisplay from '../_common/PriceDisplay';

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
                <Box sx={{ borderLeft: 1, borderRight: 1, borderBottom: 1, borderColor: 'divider'}}>
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
    const [cardLists, setCardLists] = useState({0: [], 1:[]})

    const addToCardLists = (listNum, card) => {
        setCardLists((oldCardLists) => ({...oldCardLists, [listNum]: [...oldCardLists[listNum], card]}))
    }

    const removeFromCardLists = (listNum, cardId) => {
        setCardLists((oldCardLists) => ({...oldCardLists, [listNum]: oldCardLists[listNum].filter((card) => card.id !== cardId)}));
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ width: '95vw' }}>
            <Box >
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="card list tabs"
                    variant="fullWidth"
                    >
                    <Tab label="Card List One" {...a11yProps(0)} sx={{ borderTop: 1, borderRight: 1, borderLeft: 1, borderBottom: value=== 0 ? 0 : 1, borderColor: 'divider' }}/>
                    <Tab label="Card List Two" {...a11yProps(1)} sx={{ borderTop: 1, borderRight: 1, borderBottom: value=== 1 ? 0 : 1, borderColor: 'divider' }}/>
                </StyledTabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CardList  value={value} addToCardLists={addToCardLists} removeFromCardLists={removeFromCardLists} cards={cardLists[value]}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CardList value={value} addToCardLists={addToCardLists} removeFromCardLists={removeFromCardLists} cards={cardLists[value]}/>
            </CustomTabPanel>
            <Typography>
                Card List One Price: <PriceDisplay cards={cardLists[0]}/>
            </Typography>
            <Typography>
                Card List Two Price: <PriceDisplay cards={cardLists[1]}/>
            </Typography>
        </Container>
    );
}