import React from "react";
import axios from 'axios'

import renderWithRouter from "./renderWithRouter";
import AddCardModal from "./AddCardModal";

import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, render } from "@testing-library/react";

const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}

// mock axios for useEffect API call
jest.mock('axios');

describe('AddCardModal tests', () => {
    it('should render without crashing', () => {
        render(<AddCardModal open={true} onClose={()=> false}/>);
    })

    it('should match snapshot', () => {
        const { asFragment } = render(<AddCardModal open={true} onClose={()=> null}/>);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should list returned cards after user types, clear cards after search term is cleared', async () => {
        axios.mockResolvedValue({data:{cards: [testCard]}});
        const { queryByText, queryByLabelText } = renderWithRouter(<AddCardModal open={true} onClose={()=> false}/>);

        const textInput = queryByLabelText('Card Name')
        expect(queryByText('Add Cards')).toBeInTheDocument();
        expect(textInput).toBeInTheDocument();

        await act(async () => {
            await userEvent.type(textInput, 'isl');
        })

        expect(textInput).toHaveValue('isl')

        await waitFor(() => {
            expect(queryByText("Island")).toBeInTheDocument()
        })

        await act(async ()=> {
            await userEvent.clear(textInput)
        })

        await waitFor(() => {
            expect(queryByText("Island")).not.toBeInTheDocument()
        })        
    })

    it('should return no cards if no cards found', async () => {
        axios.mockResolvedValue({data:{cards: []}});
        const { queryByText, queryByLabelText } = renderWithRouter(<AddCardModal open={true} onClose={()=> false}/>);

        const textInput = queryByLabelText('Card Name')
        expect(queryByText('Add Cards')).toBeInTheDocument();
        expect(textInput).toBeInTheDocument();

        await act(async () => {
            await userEvent.type(textInput, 'not-a-card');
        })

        expect(textInput).toHaveValue('not-a-card')

        await waitFor(() => {
            expect(queryByText("Island")).not.toBeInTheDocument()
        })
    })
})