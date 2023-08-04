import React from "react";
import renderWithRouter from "../_common/renderWithRouter"
import CardList from "./CardList";
import userEvent from '@testing-library/user-event'
import { act, waitFor, screen } from "@testing-library/react";
import axios from "axios";

jest.mock('axios')

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
        foil: "No"
    },
    {
        art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
        artist: "Pablo Picasso",
        collector_number: "4",
        id: "test85e9-bbb2-463a-b35c-bee13008a2c6",
        name: "Momir Vig, Simic Visionary",
        oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
        set_code: "IXL",
        set_name: "Ixalan",
        usd_etched_price: null,
        usd_foil_price: "600",
        usd_price: "30",
        foil: "No"
    }
];

describe('CardList Unit Tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardList />);
    });

    it("should render all cards in list", async () => {
        const { queryByText } = renderWithRouter(<CardList cards={testCards} />);

        expect(queryByText('Ulamog, the Infinite Gyre')).toBeInTheDocument();
        expect(queryByText('Momir Vig, Simic Visionary')).toBeInTheDocument();
    })

    it("should remove a card in a list", async () => {
        const removeFromCardLists = jest.fn();
        const { queryByText, queryAllByRole } = renderWithRouter(<CardList cards={testCards} removeFromCardLists={removeFromCardLists}/>);

        expect(queryByText('Ulamog, the Infinite Gyre')).toBeInTheDocument();
        expect(queryByText('Momir Vig, Simic Visionary')).toBeInTheDocument();

        act(() => {
            userEvent.click(queryAllByRole('button')[1]);
        })

        await waitFor(() => {
            expect(removeFromCardLists).toHaveBeenCalled();
        })
    })
});

// describe("Card List Integration Tests", () => {
//     it("should be able to add a card to itself", async () => {
//         let activeList = 'left';
//         const makeActive = jest.fn();
//         const { queryByText,
//             queryAllByText,
//             queryByRole,
//             queryByLabelText,
//             queryByAltText,
//             queryByDisplayValue } = renderWithRouter(
//                 <CardList
//                     activeList={activeList}
//                     makeActive={makeActive}
//                     side={'left'}
//                     fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]} />
//             );

//         expect(queryByText('Add Card')).toBeInTheDocument();
//         expect(queryByText('Ulamog, the Infinite Gyre')).not.toBeInTheDocument();
//         // click add card button
//         act(() => {
//             userEvent.click(queryByText('Add Card'));
//         });

//         // find searchbar
//         await waitFor(() => {
//             expect(queryByLabelText('Card Name')).toBeInTheDocument();
//         });

//         const textInput = queryByLabelText('Card Name');

//         // mock axios response with card name and oracle_id
//         axios.mockResolvedValue(
//             {
//                 data:
//                 {
//                     cards:
//                         [
//                             {
//                                 name: "Ulamog, the Infinite Gyre",
//                                 oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f"
//                             }
//                         ]
//                 }
//             });

//         await act(async () => {
//             // enter text
//             userEvent.type(textInput, 'ul');
//         })

//         expect(textInput).toHaveValue('ul')

//         await waitFor(() => {
//             expect(queryByRole('option')).toBeInTheDocument();
//         })

//         // mock axios response with printings
//         axios.mockResolvedValue({ data: { cards: [testCards[0]] } });

//         await act(async () => {
//             // select card
//             userEvent.click(queryByText('Ulamog, the Infinite Gyre'));
//         })

//         await waitFor(() => {
//             expect(queryByAltText(`${testCards[0].name} art by ${testCards[0].artist}`)).toBeInTheDocument();
//         })

//         // check form input
//         const quantity = queryByRole('textbox');
//         const foilInput = queryByDisplayValue("No");
//         const setInput = queryByDisplayValue("Double Masters 2022-337")

//         expect(quantity).toHaveValue("1");
//         expect(foilInput).toHaveDisplayValue("No");
//         expect(setInput).toHaveValue("Double Masters 2022-337");
//         expect(queryByText('Add Card!')).toBeInTheDocument();

//         // click add card button

//         act(()=> {
//             userEvent.click(queryByText('Add Card!'))
//         })
//         // check that the card is in the list

//         expect(queryByText('Ulamog, the Infinite Gyre')).toBeInTheDocument();
//         // check that the card is displaying all the correct info

//         expect(queryByText('Foil: No')).toBeInTheDocument();
//         expect(queryByText('Qty: 1')).toBeInTheDocument();
//         // price in CardItem
//         expect(queryAllByText('$25.48')[0]).toBeInTheDocument();

//         expect(queryAllByText('$25.48')[1]).toBeInTheDocument();
//     })
// })