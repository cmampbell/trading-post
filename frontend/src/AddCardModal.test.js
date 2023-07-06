import React from "react";
import renderWithRouter from "./renderWithRouter";
import AddCardModal from "./AddCardModal";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen } from "@testing-library/react";

// const user = userEvent.setup()

const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}

describe('AddCardModal tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<AddCardModal card={testCard}/>);
    })

    // it('should match snapshot', () => {
    //     const { asFragment } = renderWithRouter(<CardList />);

    //     expect(asFragment()).toMatchSnapshot();
    // })

    it('should render title', async () => {
        const { queryByText } = renderWithRouter(<AddCardModal card={testCard}/>);

        expect(queryByText('Add Cards')).toBeInTheDocument();

        // await act(async () => {
        //     await user.click(queryByText("Price:"));
        // })

        // waitFor(() => {
        //     expect(screen.getByPlaceholderText("Quality")).toBeInTheDocument()
        // })
    })
})