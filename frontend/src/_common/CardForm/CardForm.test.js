import { waitFor, act, screen, queryByLabelText } from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import CardForm from "./CardForm";
import userEvent from '@testing-library/user-event'
import FoilSelectField from "./FormInputs/FoilSelectField";
import SetSelectField from "./FormInputs/SetSelectField";
import QuantitySelectField from "./FormInputs/QuantitySelectField"

const testCard1 = {
    art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
    artist: "Thomas M. Baxa",
    collector_number: "337",
    id: "cbc085e9-bbb2-463a-b35c-bee13008a2c6",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    usd_etched_price: "60.23",
    usd_foil_price: "32.03",
    usd_price: "25.48"
}

const testCard2 = {
    set_name: 'Test Card Set 2',
    collector_number: '100',
    usd_etched_price: '$40.00',
    art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
    artist: "Thomas M. Baxa",
    id: "abc085e9-bbb2-463a-b35c-bee13008a2c6",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    set_code: "IXL",
    set_name: "Ixalan",
    usd_foil_price: "8.03",
    usd_price: "3.48"
}

describe("CardForm Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <CardForm
                card={testCard1}
                setCard={jest.fn()}
                printings={[testCard1, testCard2]}
                handleClose={jest.fn()}
                fields={[]}
                addCard={jest.fn()}
            />);
    })

    it("should track input and on submit pass into addCard", async () => {
        const addCard = jest.fn();
        const handleClose = jest.fn();
        const setCard = jest.fn();
        const {
            queryAllByRole,
            queryByRole,
            queryByDisplayValue,
        } = renderWithRouter(
            <CardForm
                card={testCard1}
                printings={[testCard1, testCard2]}
                handleClose={handleClose}
                fields={[SetSelectField, FoilSelectField, QuantitySelectField]}
                addCard={addCard}
                setCard={setCard}
            />);

        const quantity = queryByRole('textbox');
        const foilInput = queryByDisplayValue("No");
        const setInput = queryByDisplayValue("Double Masters 2022-337")

        const [setDropdown,
            foilDropdown,
            incrementButton,
            decrementButton,
            addButton] = queryAllByRole('button');

        expect(quantity).toHaveValue("1");
        expect(foilInput).toHaveDisplayValue("No");
        expect(setInput).toHaveValue("Double Masters 2022-337");


        act(() => {
            userEvent.click(setDropdown);
        })

        await waitFor(() => {
            expect(queryAllByRole('option').length).toEqual(2);
        })

        const ixalan = queryAllByRole('option')[1];

        act(() => {
            userEvent.click(ixalan);
        })

        expect(setCard).toHaveBeenCalled();

        act(() => {
            userEvent.click(incrementButton);

            userEvent.click(foilDropdown);
        })

        await waitFor(() => {
            expect(quantity).toHaveValue("2");
            expect(queryAllByRole('option').length).toEqual(3);
        })

        act(() => {
            userEvent.click(queryAllByRole('option')[1]);
        })

        await waitFor(() => {
            expect(foilInput).toHaveDisplayValue('Yes');
        })

        act(() => {
            userEvent.click(addButton);
        })

        expect(addCard).toHaveBeenCalled();
        expect(addCard).toHaveBeenLastCalledWith({...testCard1}, {foil: "Yes", quantity: 2 })
        expect(handleClose).toHaveBeenCalled();

    })
})