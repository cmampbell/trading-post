import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardList from "./CardList";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

const user = userEvent.setup()

describe('CardList tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardList />);
    })

    it('should match snapshot', () => {
        const { asFragment } = renderWithRouter(<CardList />);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should navigate to card search page when add card button is clicked', async () => {
        const { queryByText } = renderWithRouter(<CardList />);

        expect(queryByText('Add Card')).toBeInTheDocument();
        expect(queryByText('Total Price:')).toBeInTheDocument();

        await act(async () => {
            await user.click(queryByText("Add card"));
        })

        waitFor(() => {
            expect(screen.getByPlaceholderText("Search")).toBeInTheDocument()
        })
    })

})

