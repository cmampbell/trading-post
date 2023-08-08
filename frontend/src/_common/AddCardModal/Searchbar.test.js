import React from "react";
import renderWithRouter from "../renderWithRouter";
import Searchbar from "./Searchbar";
import userEvent from '@testing-library/user-event'
import { waitFor, act } from "@testing-library/react";
import axios from "axios";

jest.mock('axios')

const testCards = [
    { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'},
    { name: 'Isuldor', image_uri: 'test_uri2', usd_price: '7.65', id: '2' , setCode: 'IXL'}
]

describe('Searchbar tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<Searchbar setSelectedCard={()=> null} selectedCard={''}/>);
    })

    it('should show text input', async () => {
        const { queryByLabelText } = renderWithRouter(<Searchbar setSelectedCard={()=> null} selectedCard={''}/>);

        expect(queryByLabelText('Card Name')).toBeInTheDocument();
    })

    it('should list returned cards after user types, clear cards after search term is cleared', async () => {
        axios.mockResolvedValue({data:{cards: testCards}});
        const { queryByText, queryByLabelText, queryAllByRole } = renderWithRouter(<Searchbar setSelectedCard={()=> null} selectedCard={''}/>);

        const textInput = queryByLabelText('Card Name');
        expect(textInput).toBeInTheDocument();

        await act(async () => {
            userEvent.type(textInput, 'is');
        })

        expect(textInput).toHaveValue('is')
        
        await waitFor(() => {
            expect(queryAllByRole('option').length).toEqual(2)
        })

        axios.mockResolvedValue({data:{cards: [{ name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}]}});
        await act(async () => {
            userEvent.type(textInput, 'la');
        });

        expect(textInput).toHaveValue('isla')
        await waitFor(() => {
            expect(queryAllByRole('option').length).toEqual(1)
        });

        await act(async ()=> {
            userEvent.clear(textInput);
        });

        await waitFor(() => {
            expect(queryAllByRole('option').length).toEqual(0);
        });      
    })

    it('should return no cards if no cards found', async () => {
        axios.mockResolvedValue({data:{cards: []}});
        const { queryByText, queryByLabelText } = renderWithRouter(<Searchbar setSelectedCard={()=> null} selectedCard={''}/>);

        const textInput = queryByLabelText('Card Name');
        expect(textInput).toBeInTheDocument();

        await act(async () => {
            userEvent.type(textInput, 'not-a-card');
        });

        expect(textInput).toHaveValue('not-a-card');

        await waitFor(() => {
            expect(queryByText("Island")).not.toBeInTheDocument()
        });
    });
})