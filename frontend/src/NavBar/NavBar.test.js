import NavBar from './NavBar';
import renderWithRouter from "../_common/renderWithRouter";
import userEvent from '@testing-library/user-event';
import { waitFor, act } from '@testing-library/react';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<NavBar />);
    });

    it('clicking icon shows links', () => {
        const { queryByRole, queryByText } = renderWithRouter(<NavBar />);

        act(() => {
            userEvent.click(queryByRole('button'));
        });

        waitFor(() => {
            expect(queryByText('Login')).toBeInTheDocument();
            expect(queryByText('Register')).toBeInTheDocument();
        });
    });

    it('should display user links if there is a token', () => {
        const { queryByRole, queryByText } = renderWithRouter(<NavBar token={'token'} currUser={{ id: '0', username: 'test' }} />);

        act(() => {
            userEvent.click(queryByRole('button'));
        });

        waitFor(() => {
            expect(queryByText('My Account')).toBeInTheDocument();
            expect(queryByText('Log Out')).toBeInTheDocument();
        });
    });
});