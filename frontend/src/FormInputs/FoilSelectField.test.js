import { waitFor, act } from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import FoilSelectField from "./FoilSelectField";
import userEvent from '@testing-library/user-event'

describe("Form Select Field Unit Tests", () => {
    it("should render without crashing", () => {
        renderWithRouter(
            <FoilSelectField
                cardData={{ foil: 'Yes' }}
                updateCardData={jest.fn()}
                card={{ usd_foil_price: '$1.00' }}
            />);
    })

    it("should handle missing data without crashing", async () => {
        renderWithRouter(
            <FoilSelectField
                cardData={{}}
                updateCardData={(name, value) => cardData[name] = value}
                card={{}}
            />);
    })

    it("should render all selection options", async () => {
        const cardData = { foil: 'No' }
        const { queryByText, queryAllByText, queryByLabelText } = renderWithRouter(
            <FoilSelectField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
                card={{ usd_foil_price: '$1.00', usd_price: '$0.50', usd_etched_price: '$2.00' }}
            />);

        act(() => {
            userEvent.click(queryByLabelText('Foil'))
        })

        await waitFor(() => {
            expect(queryAllByText('No')[0]).toBeInTheDocument();
            expect(queryAllByText('No')[1]).toBeInTheDocument();
            expect(queryByText('Yes')).toBeInTheDocument();
            expect(queryByText('Etched')).toBeInTheDocument();
        })
    })

    it("should only render available selection options", async () => {
        const cardData = { foil: 'No' }
        const { queryByText, queryAllByText, queryByLabelText } = renderWithRouter(
            <FoilSelectField
                cardData={cardData}
                updateCardData={(name, value) => cardData[name] = value}
                card={{ usd_price: '$0.50', usd_etched_price: '$2.00' }}
            />);

        act(() => {
            userEvent.click(queryByLabelText('Foil'))
        })

        await waitFor(() => {
            expect(queryAllByText('No')[0]).toBeInTheDocument();
            expect(queryAllByText('No')[1]).toBeInTheDocument();
            expect(queryByText('Yes')).not.toBeInTheDocument();
            expect(queryByText('Etched')).toBeInTheDocument();
        })
    })
})