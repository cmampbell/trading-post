import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material';

const Card = ({ card }) => {
    const { name, setCode, usd_price, id, image_uri } = card;

    return (
    < Accordion >
        <AccordionSummary
            aria-controls={`${name}-content`}
            id={`${name}-${id}-header`}>
            <p>{name}, {setCode} Price: {usd_price} </p>
        </AccordionSummary>
        <AccordionDetails>
            <p>{image_uri}</p>
        </AccordionDetails>
    </Accordion>
    )
}

export default Card;