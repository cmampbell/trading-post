import React from "react";
import renderWithRouter from "./renderWithRouter";
import TradePage from "./TradePage";
// import userEvent from '@testing-library/user-event'
// import { act } from "react-dom/test-utils";
// import { waitFor, screen } from "@testing-library/react";

// const user = userEvent.setup()

describe('TradePage tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<TradePage />);
    })

    // will put this back in when done desigining
    // it('should match the snapshot', () => {
    //     const { asFragment } = renderWithRouter(<TradePage />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should have correct elements', () => {
        const { queryAllByText, queryByText } = renderWithRouter(<TradePage />);

        expect(queryByText('Trade Details')).toBeInTheDocument();
        expect(queryAllByText("Card list").length).toEqual(2);
        expect(queryByText('Commit Trade')).toBeInTheDocument();
    })
})