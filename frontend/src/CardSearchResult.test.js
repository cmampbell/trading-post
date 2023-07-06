import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardSearchResult from "./CardSearchResult";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}

describe('Card tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardSearchResult card={testCard}/>);
    })

    // it('should match snapshot', () => {
    //     const { asFragment } = renderWithRouter(<CardList />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should open dialogue on button click', async () => {
        const { queryAllByRole, queryByText } = renderWithRouter(<CardSearchResult card={testCard}/>);

        
        expect(queryByText('Island')).toBeInTheDocument();
        expect(queryAllByRole("button")[0]).toBeInTheDocument();
        const cardButton = queryAllByRole("button")[0]

        await act(async () => {
            await user.click(cardButton);
        })

        // waitFor(() => {
        //     expect(screen.getByPlaceholderText("Quality")).toBeInTheDocument()
        // })
    })
})