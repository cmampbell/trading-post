import React from "react";
import renderWithRouter from "./renderWithRouter";
import CardDetailsBox from "./CardDetailsBox";
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";
import { waitFor, screen, queryByLabelText } from "@testing-library/react";

const testCard = { name: 'Island', image_uri: 'test_uri', usd_price: '7.65', id: '1' , setCode: 'IXL'}
const testCard2 = { name: 'Mountain', image_uri: 'test_uri', usd_price: '7.65', id: '2' , setCode: 'IXL'}

describe('CardList tests', () => {
    it('should render without crashing', () => {
        renderWithRouter(<CardDetailsBox cards={[testCard, testCard2]} />);
    })

    it('should match snapshot', () => {
        const { asFragment } = renderWithRouter(<CardDetailsBox cards={[testCard, testCard2]} />);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should render all necessary fields', async () => {
        const { queryByText, queryByAltText, queryByLabelText } = renderWithRouter(<CardDetailsBox cards={[testCard, testCard2]}/>);

        expect(queryByText('Island')).toBeInTheDocument();
        expect(queryByAltText('Island image')).toBeInTheDocument();
        expect(queryByLabelText('Set')).toBeInTheDocument();
        expect(queryByLabelText('Condition')).toBeInTheDocument();
        expect(queryByLabelText('Foil')).toBeInTheDocument();
        expect(queryByText(`$${testCard.usd_price}`)).toBeInTheDocument();
        expect(queryByText(`Add Card!`)).toBeInTheDocument();
    })
})