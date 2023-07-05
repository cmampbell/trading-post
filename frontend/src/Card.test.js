import React from "react";
import renderWithRouter from "./renderWithRouter";
import Card from "./Card";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

// const user = userEvent.setup()

const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}

describe('Card tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<Card card={testCard}/>);
    })

    // it('should match snapshot', () => {
    //     const { asFragment } = renderWithRouter(<CardList />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should show more card details on click', async () => {
        const { queryByText } = renderWithRouter(<Card card={testCard}/>);

        expect(queryByText(`${testCard.name}, ${testCard.setCode} Price: ${testCard.usd_price}`)).toBeInTheDocument();

        // await act(async () => {
        //     await user.click(queryByText("Price:"));
        // })

        // waitFor(() => {
        //     expect(screen.getByPlaceholderText("Quality")).toBeInTheDocument()
        // })
    })
})
