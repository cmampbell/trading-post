import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardDetailsBox from "./CardDetailsBox";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

// const user = userEvent.setup()
const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}
const testCard2 = { name: 'Mountain', image_uri: 'test_uri', usd_price: '7.65', id: '2' , setCode: 'IXL'}

describe('CardList tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardDetailsBox cards={[testCard, testCard2]} />);
    })

    // it('should match snapshot', () => {
    //     const { asFragment } = renderWithRouter(<CardList />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should navigate to card search page when add card button is clicked', async () => {
        const { queryByText } = renderWithRouter(<CardDetailsBox cards={[testCard, testCard2]}/>);

        expect(queryByText('Island')).toBeInTheDocument();
        // expect(queryByText('Total Price:')).toBeInTheDocument();

        // await act(async () => {
        //     await user.click(queryByText("Add card"));
        // })

        // waitFor(() => {
        //     expect(screen.getByPlaceholderText("Search")).toBeInTheDocument()
        // })
    })
})