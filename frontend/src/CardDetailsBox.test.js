import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardDetailsBox from "./CardDetailsBox";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen, queryByLabelText } from "@testing-library/react";

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
        usd_price: "25.48"
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
    }
]

describe('CardList tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardDetailsBox cards={testCards} />);
    })

    it('should match snapshot', () => {
        const { asFragment } = renderWithRouter(<CardDetailsBox cards={testCards} />);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should render all necessary fields', async () => {
        const { queryByText, queryByAltText, queryByLabelText } = renderWithRouter(<CardDetailsBox cards={testCards} />);

        expect(queryByText("Ulamog, the Infinite Gyre")).toBeInTheDocument();
        expect(queryByAltText(`${testCards[0].name} art by ${testCards[0].artist}`)).toBeInTheDocument();
        expect(queryByLabelText('Set')).toBeInTheDocument();
        expect(queryByLabelText('Condition')).toBeInTheDocument();
        expect(queryByLabelText('Foil')).toBeInTheDocument();
        expect(queryByText(`$${testCards[0].usd_price}`)).toBeInTheDocument();
        expect(queryByText(`Add Card!`)).toBeInTheDocument();
    })

    it('should change cards based on user input', async () => {
        const { queryByText, queryByLabelText, queryByAltText } = renderWithRouter(<CardDetailsBox cards={testCards} />);

        const setInput = queryByLabelText('Set');
        const foilInput = queryByLabelText('Foil');

        expect(queryByAltText(`${testCards[0].name} art by ${testCards[0].artist}`)).toBeInTheDocument();
        expect(queryByText(`$${testCards[0].usd_price}`)).toBeInTheDocument();

        await act(async () => {
            userEvent.click(setInput);
        })

        expect(queryByText(`${testCards[1].set_name} - #${testCards[1].collector_number}`)).toBeInTheDocument();

        await act(async () => {
            userEvent.click(queryByText(`${testCards[1].set_name} - #${testCards[1].collector_number}`));
        })

        expect(queryByAltText(`${testCards[1].name} art by ${testCards[1].artist}`)).toBeInTheDocument();
        expect(queryByText(`$${testCards[1].usd_foil_price}`)).toBeInTheDocument();

        await act(async () => {
            userEvent.click(foilInput);
            
        })

        await act(async() => {
            userEvent.click(queryByText('Etched'));
        })

        expect(queryByText(`$${testCards[1].usd_etched_price}`)).toBeInTheDocument();
    })
})