import { waitFor, act,} from "@testing-library/react";
import renderWithRouter from "../../renderWithRouter";
import QualitySelectField from "./QualitySelectField";
import userEvent from '@testing-library/user-event';

describe("Quality Field Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <QualitySelectField
                cardData={{ quality: 'Lightly Played' }}
                updateCardData={jest.fn()}
            />);
    });

    it("should handle missing data without crashing", async () => {
        renderWithRouter(
            <QualitySelectField
                cardData={{}}
                updateCardData={jest.fn()}
            />);
    });

    it("should render all selection options", async () => {
        const cardData = { quality: 'Lightly Played' };
        const { queryByText, queryAllByText, queryByLabelText } = renderWithRouter(
            <QualitySelectField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
            />);

        act(() => {
            userEvent.click(queryByLabelText('Condition'));
        });

        await waitFor(() => {
            expect(queryAllByText('Lightly Played')[0]).toBeInTheDocument();
            expect(queryAllByText('Lightly Played')[1]).toBeInTheDocument();
            expect(queryByText('Near Mint')).toBeInTheDocument();
            expect(queryByText('Moderately Played')).toBeInTheDocument();
            expect(queryByText('Heavily Played')).toBeInTheDocument();
            expect(queryByText('Damaged')).toBeInTheDocument();
        });

        act(() => {
            userEvent.click(queryByText('Heavily Played'));
        });

        await waitFor(()=> {
            expect(cardData.quality).toEqual('Heavily Played');
        });
    });
});