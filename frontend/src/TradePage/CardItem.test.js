import React from "react";
import renderWithRouter from "../_common/renderWithRouter"
import Card from "./CardItem";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

const testCard = {
    art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
    artist: "Thomas M. Baxa",
    collector_number: "337",
    id: "cbc085e9-bbb2-463a-b35c-bee13008a2c6",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    usd_etched_price: null,
    usd_foil_price: "32.03",
    usd_price: "25.48"
}

describe('Card tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<Card card={testCard}/>);
    })
})
