import React from "react";
import axios from 'axios'

import AddCardModal from "./AddCardModal";

import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, render } from "@testing-library/react";

// mock axios for useEffect API call
jest.mock('axios');

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
        usd_etched_price: null,
        usd_foil_price: "600",
        usd_price: "30",
    }
]

describe('AddCardModal tests', () => {
    it('should render without crashing', () => {
        render(<AddCardModal open={true} onClose={()=> false}/>);
    })

    it('should be able to be closed with close button', () => {
        let isOpen = true;
        const close = ()=> isOpen = false;
        const { queryByText, queryAllByRole } = render(<AddCardModal open={true} setSearchOpen={close} setListCards={()=> null}/>);

        expect(queryByText('Search By Card Name')).toBeInTheDocument();

        act(()=> {
            userEvent.click(queryAllByRole('button')[0]);
        })

        waitFor(()=> {
            expect(queryByText('Search By Card Name')).not.toBeInTheDocument();
        })
    })

    it('should render CardDetailsBox after user selects card from Searchbar', async ()=> {
        let isOpen = true;
        const close = ()=> isOpen = false;
        const setListCards = jest.fn(()=> null)
        axios.mockResolvedValue({data:{cards: [{name: "Ulamog, the Infinite Gyre", oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f"}]}});
        const { queryByText, queryByLabelText, queryByAltText, queryAllByRole } = render(<AddCardModal open={true} setSearchOpen={close} setListCards={setListCards}/>);

        expect(queryByLabelText('Card Name')).toBeInTheDocument();
        const searchBar = queryByLabelText('Card Name');

        await act(async ()=> {
            userEvent.type(searchBar, 'Ulam');
        })

        await waitFor( async ()=> {
            expect(queryByText('Ulamog, the Infinite Gyre')).toBeInTheDocument();
        })
        axios.mockResolvedValue({data:{cards: testCards }});
        await act(async ()=>{
            userEvent.click(queryByText('Ulamog, the Infinite Gyre'));
        })

        await waitFor(async ()=> {
            expect(queryByAltText(`${testCards[0].name} art by ${testCards[0].artist}`)).toBeInTheDocument();
            expect(queryByText(`$${testCards[0].usd_price}`)).toBeInTheDocument();
            expect(queryByText('Add Card!')).toBeInTheDocument();
        })

        await act(async ()=> {
            userEvent.click(queryByText('Add Card!'));
        })

        await waitFor(async ()=> {
            expect(setListCards.mock.calls).toHaveLength(1);
        })

    })
})