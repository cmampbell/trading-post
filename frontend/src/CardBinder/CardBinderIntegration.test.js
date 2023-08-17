import CardBinder from './CardBinder';
import renderWithRouter from '../_common/renderWithRouter';
import Api from '../Api/Api';
import CardCollection from '../Api/CardCollectionService';
import { waitFor, act, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

jest.mock('../Api/Api');
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
        return {
            currUser: { username: 'test', id: 1 }
        }
    },
    useParams: function () {
        return { userId: 1 }
    },
    useLoaderData: function () {
        return { cards: [testCard2], owner: 'test' }
    }
}));

const testCard = {
    artist: "Aleksi Briclot",
    card_id: "9464a820-65de-44f2-9895-46a35e8621a0",
    cmc: 11,
    collector_number: "3",
    color_identity: "",
    id: "9464a820-65de-44f2-9895-46a35e8621a0",
    image_uri: "https://cards.scryfall.io/large/front/9/4/9464a820-65de-44f2-9895-46a35e8621a0.jpg?1673146911",
    mana_cost: "{11}",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    oracle_text: "When you cast this spell, destroy target permanent.\nIndestructible\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Ulamog, the Infinite Gyre is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.",
    power: "10",
    rarity: "mythic",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    textless: false,
    toughness: "10",
    type_line: "Legendary Creature — Eldrazi",
    usd_etched_price: null,
    usd_foil_price: "25.47",
    usd_price: "23.26",
    variation: false,
};

const testCard2 = {
    artist: "Vincent Van Gogh",
    card_id: "8468a420-65de-44f2-9895-46a35e8621a0",
    cmc: 3,
    collector_number: "3",
    color_identity: "",
    id: "8468a420-65de-44f2-9895-46a35e8621a0",
    image_uri: "https://cards.scryfall.io/large/front/9/4/9464a820-65de-44f2-9895-46a35e8621a0.jpg?1673146911",
    mana_cost: "{5}",
    name: "Tim the Tiny",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    oracle_text: "First Strike",
    power: "6",
    rarity: "mythic",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    textless: false,
    toughness: "6",
    type_line: "Legendary Creature — Eldrazi",
    usd_etched_price: null,
    usd_foil_price: "1000.00",
    usd_price: "100.00",
    variation: false,
    foil: 'No',
    forTrade: true,
    quality: 'Damaged',
    quantity: 1
};

describe("CardBinder integration tests", () => {
    it("should handle adding cards", async () => {
        const {
            queryAllByRole,
            queryByText,
            queryAllByText,
            queryByLabelText,
            queryByAltText,
            queryByDisplayValue
        } = renderWithRouter({
            element: <CardBinder service={CardCollection} binderType='collection' />,
            path: '/',
        });

        expect(queryByText('Add card to collection')).toBeInTheDocument();
        expect(queryByText('Total Cards: 1')).toBeInTheDocument();
        expect(queryAllByText('$100.00').length).toEqual(2);
        expect(queryByText(testCard2.name)).toBeInTheDocument();
        expect(queryByText(testCard.name)).not.toBeInTheDocument();


        // we need to click the button to add card
        await act(async () => {
            userEvent.click(queryByText('Add card to collection'));
        });

        await waitFor(() => {
            expect(queryByText('Card Search')).toBeInTheDocument();
            expect(queryByLabelText('Card Name')).toBeInTheDocument();
        });

        // we need to search for a card
        // mock Api.request return value to be a card
        // type card name into searchbar
        Api.request.mockResolvedValue({ cards: [testCard] });
        await act(async () => {
            userEvent.type(queryByLabelText('Card Name'), 'Ulamog');
        });

        await waitFor(async () => {
            expect(queryAllByRole('option').length).toEqual(1);
            expect(queryByText(testCard.name)).toBeInTheDocument();
        });

        // we need to select that card
        Api.request.mockResolvedValue({ cards: [testCard] });
        await act(async () => {
            userEvent.click(queryByText(testCard.name));
        });

        await waitFor(async () => {
            // check that fields, art, and copyright have loaded in
            expect(queryByText('Illustrated by Aleksi Briclot. ™ & © Wizards Of The Coast, Inc.')).toBeInTheDocument();
            expect(queryByAltText(`${testCard.name} art by ${testCard.artist}`)).toBeInTheDocument();
            expect(queryByLabelText('Set')).toBeInTheDocument();
            expect(queryByLabelText('Foil')).toBeInTheDocument();
            expect(queryByLabelText('Condition')).toBeInTheDocument();
            expect(queryByLabelText('Quantity')).toBeInTheDocument();
            expect(queryByLabelText('For Trade')).toBeInTheDocument();
            expect(queryByText(`$${testCard.usd_price}`)).toBeInTheDocument();
            expect(queryByText('Add Card!')).toBeInTheDocument();
        });

        const foilInput = queryByDisplayValue('No');
        const conditionInput = queryByDisplayValue('Lightly Played');
        const forTradeInput = queryByLabelText('For Trade');

        expect(foilInput).toHaveValue('No');
        expect(conditionInput).toHaveValue('Lightly Played');
        expect(forTradeInput).not.toBeChecked();

        // we need to submit the card form
        await act(async () => {
            userEvent.click(queryByText('Add Card!'));
        });

        // we need to check that the card was added to the binder
        await waitFor(async () => {
            expect(Api.request).toHaveBeenCalled();
            expect(queryByText('Total Cards: 2')).toBeInTheDocument();
            expect(queryByText(`$${testCard.usd_price}`)).toBeInTheDocument();
            expect(queryByText(`$${(+testCard.usd_price) + (+testCard2.usd_price)}`)).toBeInTheDocument();
            expect(queryByText(testCard.name)).toBeInTheDocument();
            expect(queryByText('Quality: Lightly Played')).toBeInTheDocument();
        });
    });

    it("should handle editing cards", async () => {
        // we need to find the card in the binder
        const {
            queryAllByRole,
            queryByText,
            queryAllByText,
            queryByLabelText,
        } = renderWithRouter({
            element: <CardBinder service={CardCollection} binderType='collection' />,
            path: '/',
        });

        expect(queryByText('Add card to collection')).toBeInTheDocument();
        expect(queryByText('Total Cards: 1')).toBeInTheDocument();
        expect(queryAllByText('$100.00').length).toEqual(2);
        expect(queryByText(testCard2.name)).toBeInTheDocument();

        await act(async () => {
            userEvent.click(queryByText('Tim the Tiny'));
        });

        await waitFor(async () => {
            expect(queryByText('6/6')).toBeInTheDocument();
        });

        const editButton = queryAllByRole('button')[2];

        // we need to click the edit button
        await act(async () => {
            userEvent.click(editButton);
        });


        // we need to check that the form appeared with proper fields
        await waitFor(async () => {
            expect(queryByLabelText('For Trade')).toBeInTheDocument();
            expect(queryByLabelText('Quantity')).toBeInTheDocument();
            expect(queryByLabelText('Foil')).toBeInTheDocument();
        });

        const foilDropdown = queryAllByRole('button')[5];
        // we need to change data in the form
        // we need to submit the form
        await act(async () => {
            // can't get it to click the foil menu and change it
            userEvent.click(foilDropdown);
        });

        await waitFor(async () => {
            expect(queryAllByRole('option').length).toEqual(2);
        });

        const editData = { quality: 'Lightly Played', foil: 'Yes', quantity: 1, forTrade: false };

        Api.request.mockResolvedValue({ card: { ...testCard2, ...editData } });
        await act(async () => {
            userEvent.click(queryByText('Yes'));
        });

        await waitFor(async () => {
            expect(queryByText('Yes')).toBeInTheDocument();
        });

        await act(async () => {
            userEvent.click(queryByText('Edit Card!'));
        });

        const editDataFromApiCall = Api.request.mock.calls[0][1];

        expect(editDataFromApiCall).toEqual(editData);

        // we need to check that the card changed in the binder
        await waitFor(async () => {
            expect(Api.request).toHaveBeenCalled();
            expect(queryAllByText(`$${testCard2.usd_foil_price}`).length).toEqual(2);
        });
    });

    it("should handle deleting cards", async () => {

        // we need to find the card
        const {
            queryAllByRole,
            queryByText,
            queryAllByText,
            queryByLabelText,
        } = renderWithRouter({
            element: <CardBinder service={CardCollection} binderType='collection' />,
            path: '/',
        });

        expect(queryByText('Add card to collection')).toBeInTheDocument();
        expect(queryByText('Total Cards: 1')).toBeInTheDocument();
        expect(queryAllByText('$100.00').length).toEqual(2);
        expect(queryByText(testCard2.name)).toBeInTheDocument();

        await act(async () => {
            userEvent.click(queryByText('Tim the Tiny'));
        });

        await waitFor(async () => {
            expect(queryByText('6/6')).toBeInTheDocument();
        });

        // we need to click the delete button
        const deleteButton = queryAllByRole('button')[3];
        Api.request.mockResolvedValue({message: 'Succesfully removed card from collection'});
        await act(async () => {
            userEvent.click(deleteButton);
        });

        // we need to check the the card was removed from the binder
        await waitFor(async () => {
            expect(Api.request).toHaveBeenCalled();
            expect(queryByText('Total Cards: 0')).toBeInTheDocument();
        });
    });
});