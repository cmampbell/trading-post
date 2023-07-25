import React from "react";
import renderWithRouter from "../renderWithRouter"
import CardDetailsBox from "./CardDetailsBox";

const testCards = [
    {
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
        usd_price: "25.48",
        quantity: 1,
        foil: "No"
    },
    {
        art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
        artist: "Pablo Picasso",
        collector_number: "4",
        id: "test85e9-bbb2-463a-b35c-bee13008a2c6",
        name: "Ulamog, the Infinite Gyre",
        oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
        set_code: "IXL",
        set_name: "Ixalan",
        usd_etched_price: '7000',
        usd_foil_price: "600",
        usd_price: null,
        quantity: 1
    }
]

describe('CardDetailsBox Unit Tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardDetailsBox printings={testCards} fields={[]}/>);
    })

    it('should render image, card name, card price', async () => {
        const { queryByText, queryByAltText } = renderWithRouter(<CardDetailsBox printings={testCards} fields={[]}/>);

        expect(queryByText("Ulamog, the Infinite Gyre")).toBeInTheDocument();
        expect(queryByAltText(`${testCards[0].name} art by ${testCards[0].artist}`)).toBeInTheDocument();
    })
})