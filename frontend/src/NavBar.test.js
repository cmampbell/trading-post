import { act } from 'react-dom/test-utils';
import NavBar from './NavBar';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<NavBar />);
    });

    it('clicking icon shows links', () => {
        const { queryByRole, queryByText } = renderWithRouter(<NavBar />);

        act(()=> {
            userEvent.click(queryByRole('button'));
        })

        waitFor(()=> {
            expect(queryByText('Login')).toBeInTheDocument();
            expect(queryByText('Register')).toBeInTheDocument();
        })
    })
})