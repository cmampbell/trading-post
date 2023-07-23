import { waitFor, act } from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import ForTradeField from "./ForTradeField";
import userEvent from '@testing-library/user-event'

describe("For Trade Field Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <ForTradeField
                cardData={{ forTrade: true }}
                updateCardData={jest.fn()}
            />);
    })

    it("should handle missing data without crashing", async () => {
        renderWithRouter(
            <ForTradeField
                cardData={{}}
                updateCardData={jest.fn()}
            />);
    })

    it("should toggle forTrade bool", async () => {
        const cardData = { forTrade: true };
        const { queryByRole } = renderWithRouter(
            <ForTradeField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
            />);

        expect(cardData.forTrade).toEqual(true);

        act(() => {
            userEvent.click(queryByRole('checkbox'));
        });

        await waitFor(() => {
            expect(cardData.forTrade).toEqual(false);
        });
    });
});