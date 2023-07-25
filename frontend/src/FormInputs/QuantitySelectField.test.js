import { waitFor, act,} from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import QuantitySelectField from "./QuantitySelectField";
import userEvent from '@testing-library/user-event'

describe("Quantity Field Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <QuantitySelectField
                cardData={{ quantity: 10 }}
                updateCardData={jest.fn()}
            />);
    })

    it("should handle missing data without crashing", async () => {
        renderWithRouter(
            <QuantitySelectField
                cardData={{}}
                updateCardData={jest.fn()}
            />);
    })

    it("should change quantity on click", async () => {
        const cardData = { quantity: 10 }
        const { queryAllByRole } = renderWithRouter(
            <QuantitySelectField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
            />);

        const [incrementButton, decrementButton] = queryAllByRole('button');

        act(() => {
            userEvent.click(incrementButton);
        })

        await waitFor(() => {
            expect(cardData.quantity).toEqual(11);
        })

        act(() => {
            for(let i = 0; i < 3; i++){
                userEvent.click(decrementButton);
            }
        })

        await waitFor(() => {
            expect(cardData.quantity).toEqual(8);
        })
    })

    it("should not let quantity be less than 1", async () => {
        const cardData = { quantity: 1 }
        const { queryAllByRole, } = renderWithRouter(
            <QuantitySelectField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
            />);

        const  decrementButton = queryAllByRole('button')[1];

        act(() => {
            userEvent.click(decrementButton);
        })

        await waitFor(() => {
            expect(cardData.quantity).toEqual(1);
        })
    })
});