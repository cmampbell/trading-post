import React from "react";
import renderWithRouter from "./renderWithRouter";
import TradePage from "./TradePage";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

const user = userEvent.setup()

describe('HomePage tests', () => {
    it('should render without crashing', () => {
        // define a full route as the first argument
        renderWithRouter(<TradePage />);
    })

    it('should match the snapshot', () => {
        const { asFragment } = renderWithRouter(<TradePage />);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should have correct elements', () => {
        const { queryAllByRole, queryByText } = renderWithRouter(<TradePage />);

        expect(queryByText('Trade Page')).toBeInTheDocument();
        expect(queryAllByRole("list").length).toEqual(2);
        expect(queryByText('Commit Trade')).toBeInTheDocument();
    })
})