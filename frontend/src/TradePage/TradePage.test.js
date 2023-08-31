import React from "react";
import renderWithRouter from "../_common/renderWithRouter"
import TradePage from "./TradePage";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
      return true
    }
  }));

describe('TradePage tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<TradePage />);
    });

    it('should have correct elements', () => {
        const { queryByText } = renderWithRouter(<TradePage />);

        expect(queryByText('Trade Page')).toBeInTheDocument();
        expect(queryByText("Card List One")).toBeInTheDocument();
        expect(queryByText("Card List Two")).toBeInTheDocument();
        expect(queryByText('Add Card')).toBeInTheDocument();
    });
});