import React from "react";
import renderWithRouter from "./renderWithRouter";
import Searchbar from "./Searchbar";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

// const user = userEvent.setup()

describe('Searchbar tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<Searchbar />);
    })

    // it('should match snapshot', () => {
    //     const { asFragment } = renderWithRouter(<CardList />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should show text input', async () => {
        const { queryByLabelText } = renderWithRouter(<Searchbar />);

        expect(queryByLabelText('Card Name')).toBeInTheDocument();

        // await act(async () => {
        //     await user.click(queryByText("Price:"));
        // })

        // waitFor(() => {
        //     expect(screen.getByPlaceholderText("Quality")).toBeInTheDocument()
        // })
    })
})