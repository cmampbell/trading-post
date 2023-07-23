import { waitFor, act, screen} from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import SetSelectField from "./SetSelectField";
import userEvent from '@testing-library/user-event'

const testCard1 = {set_name: 'Test Card Set 1', collector_number: '1', usd_price: '$2.00'}
const testCard2 = {set_name: 'Test Card Set 2', collector_number: '100', usd_etched_price: '$40.00'}
describe("Quantity Field Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <SetSelectField
                printings={[testCard1, testCard2]}
                card={testCard1}
                setCard={jest.fn()}
                updateCardData={jest.fn()}
            />);
    });

    it("should handle missing data without crashing", async () => {
        renderWithRouter(
            <SetSelectField
                printings={[{}]}
                card={{}}
                setCard={jest.fn()}
                updateCardData={jest.fn()}
            />);
    });

    it("should change set on click", async () => {
        const cardData = { foil: "No" };
        const {queryByLabelText, queryByText, queryAllByText} = renderWithRouter(
            <SetSelectField
                printings={[testCard1, testCard2]}
                card={testCard1}
                setCard={jest.fn()}
                updateCardData={(name, value) => cardData[name] = value}
            />);

            act(() => {
                userEvent.click(queryByLabelText('Set'));
            })

            await waitFor(() => {
                expect(queryAllByText('Test Card Set 1 - #1')[0]).toBeInTheDocument();
                expect(queryAllByText('Test Card Set 1 - #1')[1]).toBeInTheDocument();
                expect(queryByText('Test Card Set 2 - #100')).toBeInTheDocument();
            })

            act(()=> {
                userEvent.click(queryByText('Test Card Set 2 - #100'));
            })

            await waitFor(()=> {
                expect(cardData.foil).toEqual('Etched');
                expect(queryByText('Test Card Set 2 - #100')).toBeInTheDocument();
            })
    })
});