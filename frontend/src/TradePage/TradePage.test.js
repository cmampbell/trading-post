import React from "react";
import renderWithRouter from "../_common/renderWithRouter"
import TradePage from "./TradePage";


describe('TradePage tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<TradePage />);
    })

    it('should have correct elements', () => {
        const { queryAllByText, queryByText } = renderWithRouter(<TradePage />);

        expect(queryByText('Trade Details')).toBeInTheDocument();
        expect(queryAllByText("Card List").length).toEqual(2);
        expect(queryByText('Commit Trade')).toBeInTheDocument();
    })
})