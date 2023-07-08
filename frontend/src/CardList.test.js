import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardList from "./CardList";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

describe('CardList tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardList activeList={'left'} makeActive={() => null} side={'left'} />);
    });

    it('clicking this list will make it active', async () => {
        let activeList = 'right';
        const makeActive = () => activeList = 'left';
        const { queryByText, rerender } = renderWithRouter(<CardList activeList={activeList} makeActive={makeActive} side={'left'} />);

        expect(queryByText('Add Card')).not.toBeInTheDocument();

        await act(async () => {
            userEvent.click(queryByText('Card List'));
        })
        rerender(<CardList activeList={activeList} makeActive={makeActive} side={'left'} />)
        expect(queryByText('Add Card')).toBeInTheDocument();
    });
});

// test that a click makes it the active side